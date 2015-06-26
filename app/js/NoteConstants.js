/**
 * Class with defined values for undefined values and sort orders.
 *
 * @type {{DATE_UNDEFINED: string, IMPORTANCE_DEFAULT: number, ORDERBY_FINISH_UNTIL_DATE: string, ORDERBY_CREATEDATE: string, ORDERBY_IMPORTANCE: string, date_finished_until_default: Function}}
 */
var NoteConstants = {
    /**
     * Undefined-value for date
     * @type {string}
     */
    DATE_UNDEFINED: 'DATE_UNDEFINED',

    /**
     * Default value for importance
     */
    IMPORTANCE_DEFAULT: 2,

    /**
     * Sort-Order for finishUntil
     */
    ORDERBY_FINISH_UNTIL_DATE: 'finishDate',

    /**
     * Sort-Order for createDate
     */
    ORDERBY_CREATEDATE: 'createDate',

    /**
     * Sort-Order for importance
     */
    ORDERBY_IMPORTANCE: 'importance',

    /**
     * One week in future
     */
    date_finished_until_default: function () {
        return new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000);
    }
};