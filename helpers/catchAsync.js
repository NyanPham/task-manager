export default function catchAsync(
    asyncFunction,
    successHandler,
    errorHandler
) {
    return async function (req, res) {
        try {
            await asyncFunction(req, res)
            successHandler(res)
        } catch (err) {
            errorHandler(err, res)
        }
    }
}
