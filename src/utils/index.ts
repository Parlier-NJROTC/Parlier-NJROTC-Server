export let utils = {
    /**
     * Logs a boot error and terminates the process.
     * 
     * @param {string} reason - The primary reason for the boot failure
     * @param {string} hint - Additional information about the error, and possible fixes (displayed in yellow)
     * @returns {never} - This function never returns, as it always terminates the process
     */
    LogBootError:(reason:string,hint:string): never=>{
        console.error("Boot up failure!")
        console.log("------------- REASON -------------")
        console.log(reason)
        console.log('\x1b[33m%s\x1b[0m',hint)
        process.exit(1);
    }
}