(function(){
	Number.prototype.mod = function(n) {
        return ((this % n) + n) % n;
    };

    Date.prototype.addBusDays = function(dd, holidays) {
	    var initialDate = new Date(this);
	    var wks = Math.floor(dd/5);
	    var dys = dd.mod(5);
	    var dy = this.getDay();
	    if (dy === 6 && dys > -1) {
	        if (dys === 0) {dys-=2; dy+=2;}
	        dys++; dy -= 6;}
	    if (dy === 0 && dys < 1) {
	        if (dys === 0) {dys+=2; dy-=2;}
	        dys--; dy += 6;}
	    if (dy + dys > 5) dys += 2;
	    if (dy + dys < 1) dys -= 2;
	    this.setDate(this.getDate()+wks*7+dys);

	    if(holidays){
	        var shiftDaysCount = 0
	        _.each(holidays, function(holiday){
	            if(
	                (initialDate.getTime() < holiday.getTime() && this.getTime() > holiday.getTime())
	                || initialDate.getTime() === holiday.getTime()
	                || this.getTime() === holiday.getTime())
	            {
	                shiftDaysCount++
	            }
	        }, this);
	        if(shiftDaysCount > 0){
	            this.addBusDays(shiftDaysCount,holidays);
	        }
	    }

	    return this;
	}
})();


