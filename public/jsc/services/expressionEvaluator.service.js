(function () {
	angular.module("App").factory("expressionEvaluator", function() {

		return {
			eval: eval 
		}

		function eval(data, expression) {
				switch(expression.operation) {
					case "any":
						return any(data, expression);
					case "substract":
						return substract(data, expression);
					case "sum":
						return sum(data, expression);
					case "div":
						return div(data, expression);
					case "mult":
						return mult(data, expression);
					case "equal":
						return equal(data, expression);
					case "value":
						return value(data, expression);
					case "count":
						return count(data, expression);
					// Supported only for objects. Arrays are not allowed.
					case "cast":
						return cast(data, expression);
				}
		}

		function cast(data, expression){
			var value = getOperandValue(data, expression.operands[0]);

			var type = expression.operands[1].type;

			switch(type)
			{
				case "number":
					return parseFloat(value);
				default:
					return value;
			}
		}

		function value(data, expression) {
			var operand = expression.operands[0];

			return getOperandValue(data, operand);
		}

		function equal(data, expression){

			var result = true;
			
			var operand = expression.operands[0];

			if(angular.isArray(data)){

				for(var i = 0; i < data.length; i++) {

					var operandValue = getOperandValue(data[i], operand);

					for(var i = 1; i < expression.operands.length; i++) {
						if(operandValue != getOperandValue(data[i], expression.operands[i])){
							result = false;
							break;
						}
					}

					if(!result){
						break;
					}

				}

			}
			else {
				

				var operandValue = getOperandValue(data, operand);

				for(var i = 1; i < expression.operands.length; i++) {
					if(operandValue != getOperandValue(data, expression.operands[i])){
						result = false;
						break;
					}
				}
			}

			return result;

		}

		function count(data, expression) {
			
			var result = 0;

			var operand = expression.operands[0];

			if(angular.isArray(data)) {
				angular.forEach(data, function(item) {
					result += item[operand.field].length;
				})
			}
			else {
				result = data[operand.field].length
			}
			
			return result;	
		}

		function sum(data, expression) {

			var sum = 0;

			if(angular.isArray(data)){

				angular.forEach(data, function(item){

					var result = getOperandValue(item, expression.operands[0]);

					for(var i = 1; i < expression.operands.length; i++) {
						result += getOperandValue(item, expression.operands[i]);
					}

					sum += result;
							
				});

			}
			else {
				sum = getOperandValue(data, expression.operands[0]);

				for(var i = 1; i < expression.operands.length; i++) {
					sum += getOperandValue(data, expression.operands[i]);
				}
			}

			return sum;
		}

		function sumDataByField(data, field) {

			var	result = 0;

			angular.forEach(data, function(item) {
				result += item[field];
			});

			return result;
		}

		function getOperandValue(data, operand){
			
			if(angular.isDefined(operand.field) && angular.isDefined(operand.value)) {
				if(angular.isArray(data)){
					return sumDataByField(data, operand.field) === expression.value;
				}
				else {
					return data[expression.field] === expression.value;
				}	
			}
			else if(angular.isDefined(operand.value)) {
				return operand.value;
			}
			else if(angular.isDefined(operand.field)) {
				if(angular.isArray(data)){
					return sumDataByField(data, operand.field);
				}
				else {
					return data[operand.field];
				}
			}
			else if(operand.type === "expression") {
				return eval(data, operand);
			}
		}

		function substract(data, expression) {

			var result = getOperandValue(data, expression.operands[0]);

			for(var i = 1; i < expression.operands.length; i++) {
				result -= getOperandValue(data, expression.operands[i]);
			}

			return result;
		}

		function div(data, expression) {
			var result = getOperandValue(data, expression.operands[0]);

			for(var i = 1; i < expression.operands.length; i++) {
				result /= getOperandValue(data, expression.operands[i]);
			}

			return result;	
		}

		function mult(data, expression) {
			var result = getOperandValue(data, expression.operands[0]);

			for(var i = 1; i < expression.operands.length; i++) {
				result *= getOperandValue(data, expression.operands[i]);
			}

			return result;	
		}

		function any(data, expression){
			var any = false;

			var operand = expression.operands[0];

			if(angular.isArray(data)){

				for(var i = 0; i < data.length; i++) {
					//Operand must be always expression for ANY operation.
					if(eval(data[i], operand)) {
						any = true;
						break;
					}
				}	
			}
			else {
				any = eval(data, operand);
			}
			
			return any;
		}

	})
})();