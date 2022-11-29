class DoomsdayCalc
{
    daysPattern = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    centuryPattern = ["Sunday", "Friday", "Wednesday", "Tuesday"];
    
    dateObj;
    constructor(date)
    {
        this.dateObj = date == undefined || date == null ? this.randomDate(new Date(100, 0, 1), new Date(9999, 11, 31)) : date;
        console.log(`Date: ${this.fullDate}`);
    }
    
    get doomsdayOfCentury()
    {
        let cent = this.century;
        let result;
        if(cent > 2000)
            result = this.centuryPattern[((cent - 1700)/100) % 4];
        else
            result = this.centuryPattern[3 - (((2000 - cent)/100) % 4)];

        console.log(`Doomsday for century (${cent}): ${result}`);
        return result;
    }

    get doomsdayOfYear()
    {
        let dayOfCent = this.doomsdayOfCentury;
        let dayOfCentIndex = this.daysPattern.indexOf(dayOfCent);
        let remYears = this.year%100;
        let leapYears = Math.floor(remYears/4);
        let dayOfYear = remYears%28;
        let sum = dayOfCentIndex + dayOfYear + leapYears;
        let dayIndex = sum%7;
        let result = this.daysPattern[dayIndex];
        
        console.log(`Doomsday for year (${this.year}): ${result} [${dayOfCent} + ${dayOfYear} + ${leapYears} = ${sum}, ${sum}%7 = ${dayIndex}]`);
        return result;
    }

    get doomsday()
    {
        let dayOfYear = this.doomsdayOfYear;
        let dayOfYearIndex = this.daysPattern.indexOf(dayOfYear);
        let piDate = this.piDateOfMonth;
        let result;
        if(this.date > piDate)
            result = this.daysPattern[(dayOfYearIndex + this.date - piDate)%7];
        else if(this.date < piDate)
            result = this.daysPattern[(dayOfYearIndex + piDate - this.date)%7];
        else
            result = dayOfYear;
        
        
        console.log(`Doomsday for ${this.fullDate}: ${result} [piDate: ${piDate}, actualDay: ${this.day}]`);
        return result;
    }

    get piDateOfMonth()
    {
        switch (this.month)
        {
            case 1: // Jan
                return this.isLeapYear ? 4 : 3;
            case 2: // Feb
                return this.isLeapYear ? 29 : 28;
            case 3: // Mar
                return 14;
            case 4: // Apr
                return 4;
            case 5: // May
                return 9;
            case 6: // Jun
                return 6;
            case 7: // Jul
                return 11;
            case 8: // Aug
                return 8;
            case 9: // Sep
                return 5;
            case 10: // Oct
                return 10;
            case 11: // Nov
                return 7;
            case 12: // Dec
                return 12;
        }
    }

    get isLeapYear()
    {
        return (this.year % 4 == 0) && ((this.year % 100 != 0) || this.year % 400 == 0);
    }

    get century()
    {
        return this.year - (this.year % 100);
    }

    get fullDate()
    {
        return `${this.date}.${this.month}.${this.year}`;
    }

    get year()
    {
        return this.dateObj.getFullYear();
    }

    get month()
    {
        return this.dateObj.getMonth() + 1;
    }

    get date()
    {
        return this.dateObj.getDate();
    }

    get day()
    {
        return this.daysPattern[this.dateObj.getDay()];
    }

    randomDate(start, end)
    {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
}
