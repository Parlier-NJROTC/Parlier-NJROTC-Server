import { type Request, type Response, type NextFunction } from 'express';


function EndingErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    /*if(err.message != "End of Request"){
        console.error("! Different type of error !\nHas not been implemented yet.")
        res.status(500).json({
            type:"Unknown Error",
            message:"Its internal thats all that we know"
        })
        next(err)
        return 0;
    }*/
    res.status(500).json({
        type:"End of Request",
        message:"We should have not gotten here, an error handler should have gotten here by now. Give us the instructions on how you got to this point."
    })
    console.error()
    console.error(`
        \n
        + ---------------------------------------------- +
        |  Error Information                             |
        + ---------------------------------------------- +
        Time: [${new Date().toISOString()}]
        Method: ${req.method}
        url: ${req.url}
        data: ${req.body}
        Message: ${err.message}
        `);
    return -1;
}

export default EndingErrorHandler;