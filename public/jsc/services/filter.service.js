(function(){
	angular.module("App").factory("filterService", function(){

		return {
			match: match
		}

		function calcCriteria(item, criteria) {
			
			var value;

			switch(criteria.valuetype) {
				case "int":
					value = parseInt(criteria.value);
					break;
				default:
					value = criteria.value;
			}

			switch(criteria.operator) {
				case "<":
					return item[criteria.field] < value;
				case "contains":
					return item[criteria.field].indexOf(value) > -1;
				default:
					return item[criteria.field] === value;							
			}
		}

		function match(item, operation) {
			if(angular.isUndefined(operation))
				return true;

			if(operation.operator === "and") {
				var result = true;
				for(var i = 0; i < operation.operands.length; i++) {
					var operand = operation.operands[i];
					if(operand.type === "operation") {
						if(!match(item, operand)) {
							result = false;
							break;
						}
					}
					else if (operand.type === "criteria") {
						if(!calcCriteria(item, operand)) {
							result = false;
							break;
						}
					}
				}
				return result;	
			}
			else if(operation.operator === "or") {
				var result = false;
				for(var i = 0; i < operation.operands.length; i++) {
					var operand = operation.operands[i];
					if(operand.type === "operation") {
						if(match(item, operand)) {
							result = true;
							break;
						}
					}
					else if (operand.type === "criteria") {
						if(calcCriteria(item, operand)) {
							result = true;
							break;
						}
					}
				}
				return result;
			}

			
		}



	});
})()