export class DateUtils{
    /**当月第一天 */
    public static getFirstDayOfMonth(date:Date):Date{
        date.setDate(1);
        return date;
    }
    /**当月最后一天 */
    public static getLastDayOfMonth(date:Date):Date{
        var currentMonth=date.getMonth();
        var nextMonth=++currentMonth;
        var nextMonthFirstDay:any=new Date(date.getFullYear(),nextMonth,1);
        var oneDay=1000*60*60*24;
        return new Date(nextMonthFirstDay-oneDay);
    }
    /**获取本周第一天 */
    public static getFirstDayOfWeek(date:Date):Date{
        let time = date;
        time.setDate(time.getDate() - time.getDay() + 1);
        return time;
    }
    /**本周最后一天 */
    public static getLastDayOfWeek(date:Date):Date{
        let time = date;
        time.setDate(time.getDate() + 6);
        return time;
    }
    /**获取本月天数 */
    public static getCountOfMonth(date:Date):number{
       return  date.getDate();
    }
}