define(['js/util/NumberFormatUtil'],
		function(NumberFormatUtilModule) {
	
	const NumberFormatUtil = NumberFormatUtilModule.default;

   /* TextInputView
    * Creates a text input field.
    *
    * Set the property option to specify the model property that this view is based on. [required]
    *
    * Set the textClassName property to specify a class to add to the input.
    * Set the style property to specify style values to add to the input.
    * Set the placeholder property to specify text to show as a placeholder when no text is entered.
    * Set the placeholderClassName property to specify a class to add to the placeholder element.
    * Set the placeholderCss property to specify any overriding css properties for the placeholder.
    * Set the placeholderAccountForScroll property to true to subtract the scroll position from the placeholder.
    * Set the useDefaultPlaceHolder property to true to use the placeholder property of input field.
    * 
    * Set the translationFn if you want to alter the value entered before it is set in the model.
    * This can be useful to change data types, as the input value will always be returned as text.
    * The translationFn value should be a function that takes the text input value as an argument,
    * and returns the value to be set in the model. For example:
    *    translationFn: function(val) {
    *       val = parseInt(val, 10);
    *       if (isNaN(val)) val = 0;
    *       return val;
    *    }
    *
    * Set the suffix to add a suffix to the end of the string that is put back into the model 
    * e.g a suffix of 'px' will put px onto the end of every string
    *
    * set the display suffix to add a string to the end of the text box, this is probably a 
    * indicator of what the value should be, e.g('px', '%')
    * 
    * Other options:
    * numericOnly: Set to true if the text box should accept only numbers
    * numericType: Set to “INTEGER” to disallow decimal numbers. numericOnly should be true
    * unsignedOnly: Set to true to not allow negative values. Works only when numericOnly is true
    * thousandSeparatorOn: Set to true to show the thousandths separator when numericOnly is true
    * decimalPlaces: Number of decimal places when numericOnly is true and numericType is not INTEGER.
    * minValue/maxValue: Min and Max number which can be entered
    * maxStringLength: Maximum length of the input when numericOnly is false
    * readonly: Sets the “readOnly” property of the HTML input element
    * disabled: true sets the “disabled” property of the HTML input element
    * name: Sets the “name” property of the HTML input element
    * tooltip: Sets the “title” property of the HTML input element
    * disableBrowserAutoComplete: Disable browser’s autocomplete for that field
    * width: override the width value of this input with a custom width. Note: This is a css property, so you can describe in whatever display unit you like. No unit defaults to px.
    * displayNumericArrows: display a spinner on the side of the textbox to control the quantity
    *                    ** note: this should not be used for values > 1,000 as the inputType=numeric 
    *                       causes issues with numeric separators
    * valueIsRequired: If this is true, the text box will be in an error state and a trigger will be fired every time the state changes.
    *                  The CSS classes for the red error highlighting only exist for standardTextInput input fields.
    * errorOnBlankSpaceValue: Useful only when valueIsRequired is turned on. If true, text-box will retain the the error state if the value
    *                           is only spaces. Defaults to true when valueIsRequired is true.
    * standardTextInput: apply more modern styling, adding the "standardTextInput" css class to the field
    */

   /**
    * Helper function to create delayed callbacks.
    * 
    * It accepts the following arguments:
    *    - callback: the function for which we want to create a delayed callback
    *       function.
    * 
    * It returns a function which accepts the following arguments:
    *    - ms - the number of milliseconds that the callback function should be
    *       delayed by; if < 0, clears the timer.
    * 
    * This function is meant to be used only to set delayed callbacks as a
    * property of a TextInputView instance, e.g.:
    * 
    * var TextInputView = YFView.extend({
    * [...]
    *    _delayedUpdateCallback: makeDelayedCallback(function() { this.updateValue(); }),
    * [...]
    * });
    * 
    * This is necessary because the callback function will be bound to the
    * TextInputView instance, which allows it to use "this" to refer to that
    * instance.
    */
   var makeDelayedCallback = function(callback) {
      var timer = 0;
      return function(ms) {
         clearTimeout(timer);
         if (ms >= 0) {
            timer = setTimeout(_.bind(callback, this), ms);
         }
      };
   };

     /**
     * @class TextInputView
     * @property {ReportDefinitionModel} model
     */
   var TextInputView = Backbone.View.extend({

      events: {
         'change input': 'updateValue',
         'keyup input': 'updateValueDelay',
         'blur input': 'blur',
         'focus input': 'focus',
         'click div': 'placeholderClick',
         'click .clearButton': 'clearAll'
      },

      initialize: function() {
         this.property = this.options.property;
         this.translationFn = this.options.translationFn;
         this.numericOnly = this.options.numericOnly;
         this.numericType = this.options.numericType;
         this.shouldBeInteger = this.numericType == "INTEGER";
         this.placeholder = this.options.placeholder;
         this.placeholderCss = this.options.placeholderCss;
         this.placeholderClassName = this.options.placeholderClassName;
         this.placeholderAccountForScroll = this.options.placeholderAccountForScroll;
         this.useDefaultPlaceHolder = this.options.useDefaultPlaceHolder;
         this.suffix = this.options.suffix;
         this.displaySuffix = this.options.displaySuffix;
         this.unsignedOnly = this.options.unsignedOnly;
         this.width = this.options.width;
         this.updateDelay = this.options.updateDelay || 200;
         this.displayNumericArrows = this.options.displayNumericArrows;
         this.hasClearButton = this.options.hasClearButton;
         this.onlyUpdateWhenEnterPressed = this.options.onlyUpdateWhenEnterPressed;
         //if this is true then the model will only be updated on change events or enter is pressed
         this.onChangeOnly = this.options.onChangeOnly;
         
         this.thousandSeparatorOn = this.options.thousandSeparatorOn;
         if (this.thousandSeparatorOn == undefined || this.thousandSeparatorOn == null){
        	 //if the option is not set, tries to get from the model.
        	 this.thousandSeparatorOn = this.options.model.get('thousandSeparatorOn');
         }
        	 
         if (this.thousandSeparatorOn == false || this.thousandSeparatorOn == "false"){
        	 this.thousandSeparatorOn = false;
         }else{
        	 this.thousandSeparatorOn = true;
         }
         
         this.minValue = this.options.minValue;
         this.maxValue = this.options.maxValue;
         
         this.maxStringLength = this.options.maxStringLength;
         
         if (_.isUndefined(this.options.editable)) {
        	 this.options.editable = true;
         }                
         this.readonly = this.options.readonly;
         this.disableBrowserAutoComplete = this.options.disableBrowserAutoComplete || false;
         
         this.standardTextInput = this.options.standardTextInput || false;
         
         this.inputHeading = this.options.inputHeading;


         /*
          * This option prevents this view from automatically setting its
          * element's "position" CSS property when it's not set at rendering
          * time. This can be useful if a CSS class that sets the "position"
          * property is applied to this view's element but the view is rendered
          * before it's visible, in which case the "position" property would
          * appear as not set, and whatever value is set up via the CSS class
          * would be overwritten.
          */
         this.ignoreUnsetPosition = this.options.ignoreUnsetPosition || false;
         this.valueIsRequired = this.options.valueIsRequired || false;
         this.errorOnBlankSpaceValue = this.options.errorOnBlankSpaceValue || this.valueIsRequired;

         var val = this.model.get(this.property);
         if (this.isEmpty(val)) {
        	 this.showPlaceholder = true;
         } else {
        	 this.showPlaceholder = false;
         }

         this.disabled = !!this.options.disabled;
          this.decimalPlaces = this.options.decimalPlaces || 0
         
         this.render();

         this.listenTo(this.model, 'change:' + this.property, this.redisplayValue);
         this.listenTo(this, 'valueChanged', this.redisplayValue);

      },

      redisplayValue: function() {
          // if we haven't been rendered already, then skip.
          if (!this.$input) {
              return;
          }

    	  if(!this.$input.is(':focus')) {
              let valToDisplay = this.model.get(this.property);
              if (this.numericOnly) {
                  valToDisplay = NumberFormatUtil.formatRawNumberToDisplay(valToDisplay,
                      SessionUtil.getNumericSeparators(),
                      this.unsignedOnly, this.thousandSeparatorOn);
              }
              this.$input.val(valToDisplay);
    	  }

         this.updatePlaceholder();
      },
      updateValue: function() {
    	  // Cancel delayed updates, if any
    	  this._delayedUpdateCallback(-1);

    	  var val = this.$input.val();
    	  if(this.numericOnly) {
    		  val = this.doNumericValidation(val, true); 
    	  } else {
    		  val = this.checkLength(val);
    	  }

    	  if (this.translationFn) {
    		  val = this.translationFn(val);
    	  }
    	  if(this.suffix) {
    		  val += this.suffix;
    	  }
    	  this.model.set(this.property, val);
    	  
    	  if (this.hasClearButton && !this.isEmpty(val)) {
    		  this.showClearButton();
    	  }
    	  
    	  this.checkErrorState();

    	  this.trigger('valueChanged');
      },
    
         checkErrorState: function () {
             let fireTrigger = false;
             
             if (this.valueIsRequired) {
                 
                 let val = this.model.get(this.property) || "";
                 if (this.errorOnBlankSpaceValue) {
                     // if errorOnBlankSpaceValue is true, trim the value to check for validity.
                     val = val.trim();
                 }
                 
                 if (this.isEmpty(val)) {
                     if (!this.errorState) {
                         this.$input.addClass("error");
                         this.errorState = true;
                         fireTrigger = true;
                     } 
                 } else if (this.errorState) {
                     this.$input.removeClass("error");
                     this.errorState = false;
                     fireTrigger = true;
                 }
             }
             
             if (fireTrigger) {
                 this.trigger('errorState', {errorState: this.errorState});
             }
         },

      updateValueDelay: function(e) {
         
         if (e.keyCode == '13') {
            // enter key
            this.updateValue();
            this.trigger('enterKeyPressed');
            return;
         }
         
         if(this.onlyUpdateWhenEnterPressed) {
             return;
         }
         
         var delay = (function() {
            var timer = 0;
            return function(callback, ms) {
               clearTimeout(timer);
               timer = setTimeout(callback, ms);
            };
         })();
         var myself = this;
         
         if(!this._isArrowKey(e.keyCode) && !this.onChangeOnly) {
            this._delayedUpdateCallback(this.updateDelay);
         }
      },

      _delayedUpdateCallback: makeDelayedCallback(function() { this.updateValue(); }),

      render: function() {

    	 var hasFocus = false;
         if (this.$input) {
            hasFocus = this.$input.is(':focus');
         }

         if (!this.ignoreUnsetPosition) {
            var pos = this.$el.css('position');
            if (pos != 'fixed' && pos != 'absolute') {
               this.$el.css('position', 'relative');
            }
         }
         if(this.displayNumericArrows){
            this.$el.html('<input type="number" />');
         }else{
             this.$el.html('<input type="text" />');
         }
        

         this.$input = this.$('input');

         if(this.displayNumericArrows) {
            this.$input.attr('maxValue', this.maxValue);
            this.$input.attr('minValue', this.minValue);
         }

         this.$input.prop("readonly", this.readonly);
         if (this.readonly) {
        	 this.$input.css({background: "#F4F4F4"});
         }
         
         if (this.disableBrowserAutoComplete) {
        	 this.$input.attr('autocomplete', 'off');
         }
         
         if (this.options.textClassName) {
            this.$input.addClass(this.options.textClassName);
         }
         if(this.width) {
        	 this.$input.css('width', this.width);
         }
         
         if (this.hasClearButton) {
        	 this.createClearButton();
         }

         if (this.options.style) {
            this.$input.css(this.options.style);
         }
         if(this.options.name) {
        	 this.$input.attr('name', this.options.name);
        	 this.$input.attr('id', this.options.name);
         }

    	 if(this.options.tooltip) {
    		 this.$input.attr('title', this.options.tooltip);
    	 }
    	 
    	 if (this.standardTextInput) {
    	     this.$input.addClass("standardTextInput");
    	 }
    	 
    	 if (this.inputHeading) {
    	     var $headingDiv = $('<div/>')
                     .addClass('inputHeading')
                     .text(this.inputHeading);
    	     
    	     $headingDiv.insertBefore(this.$input)
         }

         var valueUpdated = false;
         var value = this.model.get(this.property);
         if(this.numericOnly) {
        	 if(!this.isEmpty(value)) {
        		 value = NumberFormatUtil.sanitizeNumeric(value, format, this.unsignedOnly, this.decimalPlaces);
        		 if(isNaN(value)) value = "";
        		 
        		 var format = SessionUtil.getSessionOption('numericSeparators');
    			 //formats to the correct format
        		 value = NumberFormatUtil.formatRawNumberToDisplay(value, format, this.unsignedOnly, this.thousandSeparatorOn);
        	 }
         }
         
         if(this.displaySuffix) {
        	 this.$el.append(this.displaySuffix);
         }
         
         this.$input.val(value);
         
         if (valueUpdated == true)
        	 this.updateValue();

         if (this.useDefaultPlaceHolder) {
    
             this.$input.attr("placeholder", this.placeholder);
             
         } else {

            var $placeholder = $('<div class="inputplaceholdercontainer">');
            if(this.placeholderClassName){
                $placeholder.addClass(this.placeholderClassName);
            }
            this.$placeholder = $placeholder;
            $placeholder.css({'position':'absolute'});
            $placeholder.onAddedToDom($.proxy(function() {
            	this.positionPlaceHolder();
            }, this));
            $placeholder.text(this.placeholder);
            this.$el.append($placeholder);

         }

         if (hasFocus) {
            this.$input.focus();
         }

         if (this.disabled) {
            this.$input.prop('disabled', this.disabled);
         }

         return this;
         
      },
      
      positionPlaceHolder: function() {
          var pos = this.$input.position();
          if (pos == null) {
             /* guard against JS errors when the input does not exist */
             pos = { left: 0, top: 0 };
          } else if (this.placeholderAccountForScroll) {
          	var $window = $(window);
          	pos.left -= $window.scrollLeft();
          	pos.top -= $window.scrollTop();
          }

          var paddingLeft = this._getElementCssPropertyAsNumber(this.$input, 'padding-left')
                + this._getElementCssPropertyAsNumber(this.$input, 'border-left-width') + 1;
          var paddingRight = this._getElementCssPropertyAsNumber(this.$input, 'padding-right')
                + this._getElementCssPropertyAsNumber(this.$input, 'border-right-width') + 1;
          var paddingTop = this._getElementCssPropertyAsNumber(this.$input, 'padding-top')
                + this._getElementCssPropertyAsNumber(this.$input, 'border-top-width') + 1;
          var paddingBottom = this._getElementCssPropertyAsNumber(this.$input, 'padding-bottom')
                + this._getElementCssPropertyAsNumber(this.$input, 'border-bottom-width') + 1;

          var marginLeft = this._getElementCssPropertyAsNumber(this.$input, 'margin-left');
          var marginRight = this._getElementCssPropertyAsNumber(this.$input, 'margin-right');
          var marginTop = this._getElementCssPropertyAsNumber(this.$input, 'margin-top');
          var marginBottom = this._getElementCssPropertyAsNumber(this.$input, 'margin-bottom');

          var phCss = {
             fontFamily: this.$input.css('font-family'),
             fontSize: this.$input.css('font-size'),
             fontWeight: this.$input.css('font-weight'),
             zIndex: 10,
             marginLeft: (marginLeft + paddingLeft) + "px",
             marginRight: (marginRight + paddingRight) + "px",
             marginTop: (marginTop + paddingTop) + "px",
             marginBottom: (marginBottom + paddingBottom) + "px",
             left: pos.left + 'px',
             top: pos.top + 'px',
             height: this.$input.height() + 'px',
             width: this.$input.width() + 'px',
             lineHeight: this.$input.height() + 'px'
          };

          if (this.placeholderCss) {
        	  _.extend(phCss, this.placeholderCss);
          }

          this.$placeholder.css(phCss);
          
          this.$placeholder.toggle(this.placeholder != null && this.placeholder != '' && this.showPlaceholder);
      },

      blur: function() {
    	  this.trigger('blur');

    	  var val = this.$input.val();

    	  if (this.numericOnly) {
    		  var temp = val;
    		  val = this.doNumericValidation(val, true); 

    		  this.model.set(this.property, val);
    		  if (temp != val) {
    			  this.trigger('valueChanged');
    		  }
    	  }

    	  if (!this.useDefaultPlaceHolder) {
              if (_.isEmpty(this.placeholder)) return;
        
              val = this.model.get(this.property);
              if (this.isEmpty(val)) {
                  this.showPlaceholder = true;
                  this.$placeholder.show();
              } else {
                  this.showPlaceholder = false;
                  this.$placeholder.hide();
              }
          }
    	  
    	  this.checkErrorState();
      },

      disable: function() {
          this.disabled = true;
          this.$input.prop('disabled', this.disabled);
      },
      
      enable: function() {
          this.disabled = false;
          this.$input.prop('disabled', this.disabled);
      },
      
      focus: function() {
         this.trigger('focus');
         this.showPlaceholder = false;
         if (this.$placeholder) {
            this.$placeholder.hide();
         }
      },
      
      focusAndSelect: function() {
         this.showPlaceholder = false;
         if (this.$placeholder) {
            this.$placeholder.hide();
         }
         this.$input.focus();
         this.$input[0].select();
         this.$input.scrollLeft(0);
      },
      
      hasFocus: function() {
         return this.$input.is(':focus');
      },

      placeholderClick: function() {
         this.showPlaceholder = false;
         this.$placeholder.hide();
         this.$input.focus();
      },

      updatePlaceholder: function() {
         if (this.useDefaultPlaceHolder) return;
         
         var val = this.model.get(this.property);
         var newShowPlaceholder = this.isEmpty(val) && !this.hasFocus() && this.placeholder != null && this.placeholder != '';
         if (this.showPlaceholder != newShowPlaceholder) {
            this.showPlaceholder = newShowPlaceholder;
            //this.render();
            //[169413] - avoid re-rendering the input - was loosing the original input
            this.$placeholder.toggle(this.showPlaceholder);
         }
      },
      
      checkMinMaxValues: function(value) {
    	  if(value && this.numericOnly) {
			  if (_.isFinite(this.minValue) && value < this.minValue) value = this.minValue;
			  if (_.isFinite(this.maxValue) && value > this.maxValue) value = this.maxValue;
    	  }
    	  return value;
      },

      clear: function() {
         this.model.set(this.property, '');
         this.$input.val('');
      },
      
      _isArrowKey : function(keyCode) {
    	  if(keyCode == 37 || keyCode == 38 || keyCode == 39 || keyCode == 40) {
    		  return true;
    	  }
    	  return false;
      },
      
      
      /**
       * Code to get the current cursor position in the text box
       * Need the else block for IE8 to work correctly, otherwise it just returns NaN
       * 
       * 
       * offset - Pass this in to calculate where to place the start and end cursor.
       * E.g Pass in 1 to move the cursor to the right by 1.
       */
      _getInputSelection : function(offset) {
    	    var el = this.$input[0];
    	    var start = 0, end = 0, normalizedValue, range,
    	        textInputRange, len, endRange;

         if(this.displayNumericArrows) {
            return {
               start:0,
               end:0
            }
         }

    	    if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
    	        start = el.selectionStart;
    	        end = el.selectionEnd;
    	    } else {
    	        range = document.selection.createRange();

    	        if (range && range.parentElement() == el) {
    	            len = el.value.length;
    	            normalizedValue = el.value.replace(/\r\n/g, "\n");

    	            // Create a working TextRange that lives only in the input
    	            textInputRange = el.createTextRange();
    	            textInputRange.moveToBookmark(range.getBookmark());

    	            // Check if the start and end of the selection are at the very end
    	            // of the input, since moveStart/moveEnd doesn't return what we want
    	            // in those cases
    	            endRange = el.createTextRange();
    	            endRange.collapse(false);

    	            if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
    	                start = end = len;
    	            } else {
    	                start = -textInputRange.moveStart("character", -len);
    	                start += normalizedValue.slice(0, start).split("\n").length - 1;

    	                if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
    	                    end = len;
    	                } else {
    	                    end = -textInputRange.moveEnd("character", -len);
    	                    end += normalizedValue.slice(0, end).split("\n").length - 1;
    	                }
    	            }
    	        }
    	    }
    	    if(_.isUndefined(offset) || !$.isNumeric(offset)) {
    	    	offset = 0;
    	    }
    	    return {
    	        start: start + offset,
    	        end: end + offset
    	    };
    	},
      
    	/**
    	 * Function to set the cursor position of the textbox
    	 * Need the else block for IE8 compatibility.
    	 */
      	_updateInputSelection : function(inputPosition) {
    	   var el = this.$input[0];
          
          //inputType = numeric causes issues with this 
         if (this.displayNumericArrows) return;

      	if (typeof el.selectionStart == "number" && typeof el.selectionEnd == "number") {
    	        el.selectionStart = inputPosition.start;
    	        el.selectionEnd = inputPosition.end;
    	    } else {
    	    	var range = el.createTextRange();
    	    	range.collapse(true);
    	    	/**
    	    	 * This will only set one position, so you won't be able to have an actual selection.
    	    	 * Added the range.moveEnd line causes the selection to be from the wanted position to the end of the textbox
    	    	 * 
    	    	 */
    	    	range.moveStart('character', inputPosition.start);
    	    	//range.moveEnd('character', inputPosition.end);
    	    	range.select();
    	    }
      	},
      	
      	_getElementCssPropertyAsNumber: function(element, cssProperty) {
      	   var ret = parseInt($(element).css(cssProperty));

      	   if (_.isNaN(ret)) {
      	      ret = 0;
      	   }
      	   
      	   return ret;
      	},
      	
      	/**
      	 * Returns the input element within this view
      	 * @returns {element} input element
      	 */
      	getInputElement() {
      		return this.$input;
      	},

      setWidth: function(width) {

         this.width = width;
         if (this.$input) {
        	 this.$input.width(width);
         }
         if (this.$placeholder) {
            this.$placeholder.width(width);
         }

      },
      
      setPlaceholder: function(text) {
         
         this.placeholder = text;
         
         if (this.useDefaultPlaceHolder) {
             this.$input.attr("placeholder", this.placeholder);
         } else if (this.$placeholder) {
             this.$placeholder.text(text);
             this.updatePlaceholder();
         }
      }, 
      
      showValidationMessage: function(message){
    	  if (!this.$validationDiv){
	    	  this.$validationDiv = $("<div class='validationMessage'>");
	    	  this.$validationDiv.css('width', this.$input.width()+2);
	    	  this.$el.append(this.$validationDiv);
    	  }
    	  this.$validationDiv.text(message);
      },
      
      clearValidationMessage: function(){
    	  if (this.$validationDiv){
    		  this.$validationDiv.remove();
    		  this.$validationDiv = null;
    	  }
      },

      setValue: function(val) {
         this.$input.val(val);
         this.updateValue();
      },

      setMinValue: function(minVal) {
    	  this.minValue = minVal;
    	  this.updateValue();
      },
      
      setMaxValue: function(maxVal) {
    	  this.maxValue = maxVal;
    	  this.updateValue();
      },
      
      setMinMaxValue: function(minVal, maxVal) {
    	  this.minValue = minVal;
    	  this.maxValue = maxVal;
    	  this.updateValue();
      },
      
      isEmpty : function (val) {
    	  return !(val && (""+val).length > 0)
      },
      
      doNumericValidation : function (val, checkMinMax) {
    	  var format = SessionUtil.getSessionOption('numericSeparators');

    	  var rawInputVal = val;

    	  var rawNumber = NumberFormatUtil.sanitizeNumeric(val, format, this.unsignedOnly, this.decimalPlaces);
    	  
    	  rawNumber = this.checkLength(rawNumber);
    	  
    	  //validates min and max
    	  if (checkMinMax) {
    		  rawNumber = this.checkMinMaxValues(rawNumber);
    	  }
    	  val = rawNumber;

    	  //formats to the correct format
    	  val = NumberFormatUtil.formatRawNumberToDisplay(val, format, this.unsignedOnly, this.thousandSeparatorOn);

    	  //if it must be an integer, removes the decimal part.
    	  if(this.shouldBeInteger && val != null && val != "") {
              var int = parseInt(rawNumber);
    		  var newVal = NumberFormatUtil.formatRawNumberToDisplay(int+"", format, this.unsignedOnly, this.thousandSeparatorOn);
    		  if(newVal != val) {
    			  val = newVal;
    		  }
    	  }

    	  //Get the position of the cursor before replacing the text and add the difference in length to the position
    	  var diff = val.length - rawInputVal.length;

    	  var pos = this._getInputSelection(diff);
    	  //inserts the formatted value into the field
    	  this.$input.val(val);
    	  //Apply the correct cursor positions
    	  if(this.$input.is(':focus')){
    		  this._updateInputSelection(pos);
    	  }
    	  
    	  return rawNumber;
      },
      
      checkLength : function (val) {
    	  if (this.maxStringLength != null) {
    		  if (this.suffix != null) {
    			  if (val.length > this.maxStringLength - this.suffix.length) {
    				  val = val.substring(0, this.maxStringLength - this.suffix.length);
    			  }
    		  } else {
    			  if (val.length > this.maxStringLength) {
    				  val = val.substring(0, this.maxStringLength);
    			  }
    		  }
    	  }
    	  
    	  return val;
      },
      
      createClearButton: function() {
     	 let $clearButton = $('<div>').addClass('clearButton');
    	 $clearButton.insertAfter(this.$input);  
    	 this.showClearButton();
      },
      
      positionClearButton: function($clearButton) {
    	  // We always want it to be positioned within the input view
    	  let position = this.$input.position();

    	  let inputWidth = this.$input.width();
    	  let newPosition = position.left + inputWidth;

    	  $clearButton.css({
    		  top: position.top
    	  });
      },
      
      showClearButton: function() {
    	  
    	  let $clearButton = this.$input.next(".clearButton");
    	  let value = this.$input.val();

    	  if (this.isEmpty(value) == true) {
    		  $clearButton.hide();
    	  } else {
    		  this.positionClearButton($clearButton);
        	  $clearButton.show();
    	  }
      }, 
      
      clearAll: function(event) {
    	  this.clear();
    	  this.showClearButton();
      }
   });

   return TextInputView;

});