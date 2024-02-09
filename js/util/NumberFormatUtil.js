/**
 * Collection of useful functions for number formatting
 * These were originally located in js.js
 */
const NumberFormatUtil = {
		/**
		 * Cleans the configurations formatted number (or any other character) to a regular number (leaving only the decimal separator ".")
		 * The numeric inputted fields must have the same format as the preferences set in the system. (thousand and decimal separators, ie: ".", ",")
		 * @param str with the input number formatted accordingly to the system preferences (10.321,12 | 10321,12)
		 * @param format (decimal and thousand separator characters)
		 * @returns a number formatted in the javascript default format (10321.12)
		 */
		sanitizeNumeric: function(inputNumber, format, unsignedOnly, decimalPlaces) {
			if (_.isUndefined(inputNumber)) return "";
			if (inputNumber == "0") return inputNumber;
			if (!unsignedOnly) unsignedOnly = false

			//makes sure that the format values are set
			if (format){
				if (format.thousand == null) format.thousand = ",";
				if (!format.decimal) format.decimal = ".";
			}else{
				format = {
						thousand: ",",
						decimal: "."
				}
			}

			//"number" types don't have access the the function lastIndexOf
			if(typeof inputNumber != "string") {
				inputNumber = inputNumber.toString();
			}

			if (unsignedOnly)
				inputNumber = inputNumber.replace(/\+\-/g, '')//removes all the "+ and -" if must not have signal

			if ("." != format.decimal)
				inputNumber = inputNumber.replace(/\./g, '')//removes all the "."

			//changes the last occurence of decimal separator to "."
			var decPos = inputNumber.lastIndexOf(format.decimal);
			if (decPos > -1)
				inputNumber = inputNumber.substring(0,decPos) + "." + inputNumber.substring(decPos+1);

		    if (decimalPlaces && inputNumber.lastIndexOf(format.decimal) > -1) {
		        var numberOfDecimalsInNumber = inputNumber.length - inputNumber.lastIndexOf(format.decimal) - 1;
		        if (numberOfDecimalsInNumber > decimalPlaces) {
		            var idx = numberOfDecimalsInNumber - decimalPlaces;
		            inputNumber = inputNumber.substring(0, inputNumber.length - idx);
		        }
		    }

			return inputNumber.replace(/[^0-9\+\-\.]/g, '');//removes everything that is not number, "+", "-", or "."
		},

		/**
		 * Formats a numeric field to be shown using the system settings
		 * @param integer or float number formatted accordingly to the JavaScript (10321.12)
		 * @param format (decimal and thousand separator characters)
		 * @param boolean - only positive numbers
		 * @param boolean - should the decimal separator be shown
		 * @returns a string with configurations formatted number (thousand and decimal separators, ie: ".", ",") (10.321,12)
		 */
		formatRawNumberToDisplay: function(inputNumberStr, format, unsignedOnly, thousandSeparatorOn){
			inputNumberStr = inputNumberStr+"";//makes sure the number is a STR (uses charAt)
			if (!inputNumberStr) return "";//empty is a valid value

			if (!unsignedOnly) unsignedOnly = false;

			if (thousandSeparatorOn == false || thousandSeparatorOn == "false"){ //if no value is set or it is true, means it is true, so show the separator
				//otherwise sets it to ""
				format.thousand = "";
			}

			//removes the + or - from the first position if they exist
			var first = inputNumberStr.charAt(0);
			if (!unsignedOnly){
				if (first == '-' || first == '+' ) inputNumberStr = inputNumberStr.substr(1);
				else first = "";
			}else{
				first = "";
				if (first == '-' || first == '+' ) inputNumberStr = inputNumberStr.substr(1);
			}


			//removes the 0's to the left, except if the string is only one zero!
			if (inputNumberStr == "0") return first + inputNumberStr;
			var zeros = 0;
			while(inputNumberStr.charAt(zeros) === '0')
				zeros++;
			if (zeros>0)
				inputNumberStr = inputNumberStr.substr(zeros);

		    if (inputNumberStr.indexOf(format.decimal) === 0) {
		        inputNumberStr = '0' + inputNumberStr;
		    }

			if (!inputNumberStr && first=="") return "";//after removing all the zeros

			//makes sure that the format values are set
			if (format){
				if (format.thousand == null) format.thousand = ",";
				if (!format.decimal) format.decimal = ".";
			}else{
				format = {
						thousand: ",",
						decimal: "."
				}
			}

			//checks if there is a decimal separator
			var hasDecimal = (inputNumberStr.lastIndexOf(".") > -1);
			var retValue = "";
			var digits = 0;
			var decInserted = false;
			for(var i = inputNumberStr.length-1 ; i>=0 ; i--){
				var c = inputNumberStr.charAt(i);


				if (c == '.' && !decInserted){//is the first decimal point
					retValue = format.decimal + retValue;
					decInserted = true;
					digits = 0;
				//}else if ((c == '+' || c == '-') && i==0){//is the + or - sign at the beginning
				//	if (retValue.charAt(0) == format.thousand.charAt(0) || retValue.charAt(0) == format.decimal.charAt(0) ) retValue = retValue.substr(1);
				//	retValue = c + retValue;
				}else if (/^[0-9]+/g.test(c)){//is a number
					retValue = c + retValue;
					digits++;

					if (((hasDecimal && decInserted) || !hasDecimal) && digits%3 == 0 && i>0){
						retValue = format.thousand + retValue;
						digits = 0;
					}
				}

			}

			return first+retValue;
		}

}

export default NumberFormatUtil;