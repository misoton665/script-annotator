"use strict";

// group 5

GINGER.onlineGrammarChecker = (function () {
    var unknownError = "<span class='errorMessage'>There is a problem with your internet connection, please try again later.</span>", emptyInputError = "<span class='errorMessage'>Type your own sentence...</span>", emptyInputErrorMobile = "<span class='errorMessage'>Add text here...</span>";
    var noSuggestionText = "(No Suggestions)";
    var originalSentence = "", requestInProcess = false, corrector = GINGER.namespace('correctText');
    var elementsPrefix = "GingerWidget-", CDN_URL = "//cdn.gingersoftware.com/widgetForPub/";
    var initialMsg = typeof (overrideInitialSentence) == 'undefined' ? 'Type/paste your English text for correction and Ginger It!' : overrideInitialSentence;
    var noClearOnClick = false, correctionsCounter = 0, loading = false, clear = false, reachedLimit = false;
    var markingText = "";

    var getWidgetElementId = function (id) {
        return "#" + elementsPrefix + id;
    };

    var isClear = function () {
        return clear;
    };

    var setReachedLimit = function () {
        reachedLimit = true;
    };

    var validateInput = function () {
        return $(getWidgetElementId("originalTexInput")).val() != "";
    };

    var showProgress = function () {
        $(getWidgetElementId("editOriginalWrapper")).hide();
        $(getWidgetElementId("originalHtmlText")).show();
    };

    var showSuggestion = function () {
        $(getWidgetElementId("separator")).hide();
        $(getWidgetElementId("separator")).fadeOut(100, function () {
            $(getWidgetElementId("correctedText")).append('<span class="GingerWidget-leftCorner" style="background:url(' + CDN_URL + 'inputTop-left-corrected.png)"></span>');
            $(getWidgetElementId("correctedText")).fadeIn(100);
        });
    };

    var clearSuggestionField = function () {
        if (typeof mobile_agent !== 'undefined' && mobile_agent) {
            $(getWidgetElementId("correctedText")).html("");
        } else {
            $(getWidgetElementId("correctedText")).html("").css('padding', '0');
        }
    };

    var showHideAlternativesPopup = function (show) {
        $(getWidgetElementId("alternativesDiv")).css("display", show ? "block" : "none");
        $(getWidgetElementId("alternativesInnerDiv")).css("display", show ? "block" : "none").scrollTop(0);
    };

    var clearPrevCorrections = function (keepOriginalText) {
        keepOriginalText = keepOriginalText || false;
        $(getWidgetElementId("separator")).css("margin", "16px 0 15px");
        $(getWidgetElementId("editOriginalWrapper")).show();
        $(getWidgetElementId("originalHtmlText")).hide();
        if (keepOriginalText && $('#GingerWidget-originalHtmlText').text().trim() != "Type a sentence..." && $('#GingerWidget-originalHtmlText').text().trim() != "Enter a sentence, then simply click 窶廨inger it!窶�") {
            $('.upper_textarea').css('border-color', '#999999');
            $(getWidgetElementId("originalTexInput")).focus();
            if (typeof mobile_agent !== 'undefined' && mobile_agent) {
                $(getWidgetElementId("correctedText")).html("");
            } else {
                $(getWidgetElementId("correctedText")).html("").css({ padding: '0', marginTop: '0' });
            }
            $('.widget_box2').css('margin-top', '0');
        } else {
            $('.upper_textarea').css('border-color', '#999999');
            $(getWidgetElementId("originalTexInput")).val("").focus();
            $('.widget_box2').css('margin-top', '0');
        }
        $(getWidgetElementId("submitButton")).val('Try Ginger').removeClass('tryAnother').removeClass('tryYourOwn');
        clearSuggestionField();
        showHideAlternativesPopup(false);
        $(getWidgetElementId("originalTexInput")).unbind("click", clearPrevCorrections);
        requestInProcess = false;
        return false;
    };

    var displayInputErrorMsg = function () {
        $(getWidgetElementId("editOriginalWrapper")).hide();
        $(getWidgetElementId("originalHtmlText")).show().html("");
        if (typeof mobile_agent !== 'undefined' && mobile_agent) {
            $('#GingerWidget-editOriginalWrapper').show().find('#GingerWidget-originalTexInput').focus();
        } else {
            $(getWidgetElementId("originalHtmlText")).html(emptyInputError);
        }
        loading = false;
        $(getWidgetElementId("submitButton")).val('Try Ginger').removeClass('tryAnother').removeClass('tryYourOwn');
        clear = true;
        $('.widget_box2').css('margin-top', '0');
        if (typeof mobile_agent !== 'undefined' && mobile_agent) {
            $(getWidgetElementId("correctedText")).html('');
        } else {
            $(getWidgetElementId("correctedText")).html('').css({ marginTop: '0', padding: '0' });
        }
    };

    var repositionToolTip = function (parentObject) {
        var tooltipOffsetTop = $('WidgetBox').scrollTop(), balloonWidthNoTip = 300, permittedLeftLimit = -10, mainContent = $(getWidgetElementId("correctedText")), left = $(parentObject).position().left - 8, top = $(parentObject).position().top + 26;

        $(getWidgetElementId("tooltipRight")).css('display', 'none');
        $(getWidgetElementId("tooltipLeft")).css('display', 'block');
        $(getWidgetElementId("alternativesDiv")).css("left", left + "px").css("top", top + "px");
    };

    var generateMarkingText = function () {
        var splitText = $('#GingerWidget-editOriginalWrapper').find('#GingerWidget-originalTexInput').val().split(" ");

        for (var index = 0; index < splitText.length - 1; index++) {
            if (isDisappear(splitText[index], splitText[index + 1])) markingText = markingText + splitText[index] + '<span style="color:#0000ff;">_</span>';
            else if (isConnected(splitText[index], splitText[index + 1])) markingText = markingText + splitText[index] + '<span style="color:#ff0000;">_</span>';
            else markingText = markingText + splitText[index] + ' ';
        }

        markingText += splitText[splitText.length - 1];
    }

    var isConnected = function (word1, word2) {
        var str = word1 + ' ' + word2;

        if (str.match(/\b\S*[^aiouI.,] [aeiouAEIOU]\S*\b/)) return true;
        else if (str.match(/\b\S*[tdsz] y\S*\b/)) return true;

        return false;
    }

    var isDisappear = function (word1, word2) {
        var str = word1 + ' ' + word2;

        if (str.match(/\b\S*([^aiou]) \1\S*\b/)) return true;
        else if (str.match(/\b\S*(t|th|d) (t|th|d|T|Th|D)\S*\b/)) return true;
        else if (str.match(/\b\S*(ve|p|f) [bpBP]\S*\b/)) return true;
        else if (str.match(/\b\S*(s|sh|ts) (s|sh|ts|S|Sh|Ts)\S*\b/)) return true;
        else if (str.match(/\b\S*(c|k|ke|g|que) (c|k|g|que|C|K|G|Que)\S*\b/)) return true;
        else if (str.match(/\b\S*l l\S*\b/)) return true;
        else if (str.match(/\b\S*[^aiou.,] (and|on|in)\b/)) return true;
        else if (str.match(/\b\S*[^aiou.,] (of|or)\b/)) return true;

        return false;
    }

    var displayResult = function () {

        generateMarkingText();

        $('#GingerWidget-submitButton').removeClass('tryYourOwn').addClass('tryAnother');
        $('#GingerWidget-originalHtmlText').html($('#GingerWidget-editOriginalWrapper').find('#GingerWidget-originalTexInput').val());
        $('#GingerWidget-correctedText').html(markingText + '<img class="correction_icon" src="//cdn.gingersoftware.com/widgetForPub/glasses_results.png" alt="" />');
        $('#GingerWidget-correctedText').css({ padding: '11px 50px 10px 10px' });
        $('.widget_box2').css('margin-top', '8px');
        $(getWidgetElementId("editOriginalWrapper")).hide();
        $(getWidgetElementId("originalHtmlText")).show();
        $(getWidgetElementId("correctedlText")).show();

        markingText = "";

    };

    var prepareToCorrect = function () {


        $("form" + getWidgetElementId("gingeration-correction-form")).submit(function () {

            if (!validateInput()) {
                displayInputErrorMsg();
                return false;
            }
            else if ($(getWidgetElementId("submitButton")).hasClass('tryAnother')) {
                $('#GingerWidget-editOriginalWrapper').find('#GingerWidget-originalTexInput').val('');
                clearPrevCorrections(true);
                return false;
            }
            else {
                displayResult();
                return false;
            }

        });
        $(getWidgetElementId("originalHtmlText")).bind('click', function () {
            if (true) {
                clearPrevCorrections(true);
            }
        });
    };


    return {
        prepareToCorrect: prepareToCorrect
    }
})();

$(document).ready(function () {
    var widget = GINGER.namespace('onlineGrammarChecker'),
        showDownloadPopup = false;

    widget.prepareToCorrect();
});


$(document).ready(function () {
    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    function setCookie(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }
    $('#GingerWidget-gingeration-correction-form').submit(function () {
        if (window.location.pathname.indexOf('proofreading') > -1) {
            _gaq.push(['_trackEvent', 'widget_activity', 'click-ginger-it', document.baseURI]);
        }
        if (widgetMode === 1) {

            if (window.location.pathname == "/webwidget") {
                _gaq.push(['_trackEvent', 'widget_activity_embedded', 'Sent_Reph_Widget_embedded', document.baseURI]);
            } else {
                _gaq.push(['_trackEvent', 'widget_activity', 'Sent_Reph_Widget', document.baseURI]);
            }
        }
        /*if (window.location.pathname.indexOf('grammarcheck') > -1) {
         $('#GingerWidget-correctedText').css('padding', '14px 0 5px 8px');
         }*/
    });
    if ((window.location.pathname.indexOf('proofreading') > -1 || window.location.pathname.indexOf('rephrase_demo') > -1) && (typeof widgetMode == "undefined" || widgetMode == 0)) {
        $('#GingerWidget-originalHtmlText').html('<div class="onload_text">Type a sentence...</div>');
    }
    else {
        $('#GingerWidget-submitButton').addClass('tryYourOwn');
        $('#GingerWidget-originalHtmlText').html('Type your own sentence.<br>&nbsp;');
        $('#GingerWidget-correctedText').html('Type your<span style="color:#ff0000;">_</span>own sentence.<img class="correction_icon" src="//cdn.gingersoftware.com/widgetForPub/glasses_results.png" alt="" />');
        $('#GingerWidget-correctedText').css({ padding: '11px 50px 10px 10px' });
        $('.widget_box2').css('margin-top', '8px');
        if (getCookie("widget-afterreload") == 1) {
            $('#GingerWidget-submitButton').removeClass('tryYourOwn');
            $('#GingerWidget-correctedText').html('');
            $('#GingerWidget-correctedText').css({ padding: '0' });
            $('#GingerWidget-originalHtmlText').html('<span class="errorMessage">Type your own sentence...</span>');
            $('#GingerWidget-originalHtmlText').show();
            $('#GingerWidget-editOriginalWrapper').hide();
            $('.widget_box2').css('margin-top', '0px');
            setCookie("widget-afterreload", 0);
        }
        $('.main_widget').css('visibility', 'visible');
    }
});

