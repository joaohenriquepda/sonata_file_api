'use strict';

const Helpers = use('Helpers');

const Logger = use('Logger')

class FileController {


    async upload({ request, response, auth }) {

        try {
            const data = request.all();

            const validationOptions = {
                types: ['pdf'],
                size: '300kb',
            };

            const file = request.file('file', validationOptions);

            await file.move(Helpers.tmpPath('uploads'), {
                name: data.name,
                overwrite: false,
            });

            if (!file.moved()) {

                Logger.error(file.error())
                console.log("+++++=",file.error());

                return response
                    .status(400)
                    .json({
                        error: file.error().message
                    })
            }

            return response
                .status(200)
                .json({
                    sucess: "File uploaded"
                })

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
