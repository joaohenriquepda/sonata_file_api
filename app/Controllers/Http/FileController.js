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

            await file.move(Helpers.tmpPath('uploads'), {
                name: moment.now() + data.name + '.pdf',
                overwrite: false,
            });

            if (!file.moved()) {
                Logger.error(file.error())
                return response
                    .status(400)
                    .json({
                        error: file.error().message
                    })
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

            return response
                .status(200)
                .json(file_saved)

        } catch (error) {
            Logger.error(error)
            return response
                .status(400)
                .json({
                    error: error
                })
        }

    }

}

module.exports = FileController
