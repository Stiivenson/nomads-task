export default class LoadingMessagesEnum {
    static LOADING_FIRST = 'Loading.First';

    static LOADING_SECOND = 'Loading.Second';

    static LOADING_THIRD = 'Loading.Third';

    static ERROR_TIMEOUT = 'Error.Timeout';

    static SUCCESS_LOADING_FINISHED = 'Success.LoadingFinished';

    static getLoadingMessageCode(second: number) {
        if (second >= 3) {
            return this.LOADING_THIRD;
        }

        if (second >= 2) {
            return this.LOADING_SECOND;
        }

        return this.LOADING_FIRST;
    }
}
