'use strict';

const Helpers = use('Helpers');

const Logger = use('Logger')
const moment = require("moment");

const File = use('App/Models/File')

class FileController {

    async upload({ request, response, auth }) {

        Logger.info("Upload new file")

        try {

            await auth.check();
            const user = await auth.getUser()

            const data = request.all();

            const validationOptions = {
                types: ['pdf'],
                size: '300kb',
            };

            const file = request.file('file', validationOptions);

            await file.move(Helpers.tmpPath(`uploads/${user.email}`), {
                name: `${moment.now()}_${data.name}.pdf`,
                overwrite: false,
            });

            if (!file.moved()) {
                Logger.error(file.error())
                return response.badRequest({ error: file.error().message })
            }

            Logger.debug("File saved")

            const file_saved = await File.create({
                name: data.name,
                file_name: `${moment.now()}_${data.name}.pdf`,
                description: data.description,
                size: file.size,
                type: file.extname,
                user_id: user.id
            })

            Logger.debug("File saved")

            return response.ok(file_saved)

        } catch (error) {
            Logger.error(error)
            return response.badRequest({ error: error })
        }
    }

    async show({ request, response, auth, params }) {

        try {
            await auth.check()
            const user = await auth.getUser()
            const file = await File.findBy('id', params.id)
            // .setVisible(['id', 'name', 'description', 'size']).fetch()

            if (!file) {
                return response.notFound({ error: 'File not exist' })
            }

            if (file.user_id != user.id) {
                return response.unauthorized({ error: 'Not authorized file' })
            }

            // id, nome do documento, conteúdo em texto e tamanho do arquivo
            return response.ok(file)


        } catch (error) {
            Logger.error(error)
            return response.badRequest({ error: error })
        }
    }

}

module.exports = FileController
