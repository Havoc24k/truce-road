/*global app */
/*global $ */
/* jshint bitwise: false*/

/**
 * Utils
 */
"use strict";

app.utils = (function () {
    var details = [
    {
        "title": "Αρχαία Ολυμπία",
        "text": "Η Ολυμπία, υπήρξε το πιο δοξασμένο ιερό της αρχαίας Ελλάδας αφιερωμένο στον Δία, πατέρα των θεών και των ανθρώπων. Ήταν ο τόπος διεξαγωγής των Ολυμπιακών Αγώνων οι οποίοι τελούνταν στο πλαίσιο των Ολυμπίων, της πιο σημαντικής εορτής των Ελλήνων κατά το μεγαλύτερο διάστημα της αρχαιότητας. ",
        "links": [{
            "title": "Ολυμπία @ Βικιπαιδεία",
            "url": "https://el.wikipedia.org/wiki/%CE%9F%CE%BB%CF%85%CE%BC%CF%80%CE%AF%CE%B1"
        }, {
            "title": "Ολυμπία @ ΟΔΥΣΣΕΥΣ",
            "url": "http://odysseus.culture.gr/h/3/gh351.jsp?obj_id=2358"
        }, {
            "title": "ΔΗΜΟΣ ΑΡΧΑΙΑΣ ΟΛΥΜΠΙΑΣ",
            "url": "http://www.arxaiaolympia.gov.gr/portal/page/portal/municipality/Home"
        }],
        "phones": [{
            "title": "Χρήσιμες Πληροφορίες & Τηλέφωνα Νομού Ηλείας",
            "url": "http://pirgiotis.gr/index.php?option=com_content&view=article&id=5592&Itemid=205"
        }]
    },
    {
        "title": "Αρχαία Ήλιδα",
        "text": "Ένα από τα σημαντικότερα κέντρα της Πελοποννήσου στην αρχαιότητα, έφθασε σε ακμή τα ρωμαϊκά χρόνια, οπότε και κτίστηκε ένας μεγάλος αριθμός κτιρίων και κυρίως αθλητικών εγκαταστάσεων αφού στην Ήλιδα συνέρρεε πάντα το πλήθος των αθλητών για προπόνηση, ένα μήνα πριν από τους Ολυμπιακούς Αγώνες. Ήταν η διοργανώτρια πόλη των Ολυμπιακών Αγώνων και πρωτεύουσα των Ηλείων.",
        "links": [{
            "title": "Ήλιδα @ Βικιπαιδεία",
            "url": "https://el.wikipedia.org/wiki/%CE%89%CE%BB%CE%B9%CE%B4%CE%B1"
        }, {
            "title": "Ήλιδα @ ΟΔΥΣΣΕΥΣ",
            "url": "http://odysseus.culture.gr/h/3/gh351.jsp?obj_id=2400"
        }]
    },
    {
        "title": "Πύργος",
        "text": "Στον ίδιο χώρο που βρίσκεται ο Πύργος σήμερα, τοποθετείται η Αρχαία πόλη Δυσπόντιο. Στα περίχωρα του Πύργου ήταν η αρχαία πόλη Λέτρινα, απ' όπου είχε πάρει και την ονομασία του σαν Δήμος Λετρίνων μέχρι την Δεκαετία του 1980. Η ονομασία της πόλης προέρχεται από τον πύργο που είχε κατασκευάσει, το 1512, στην θέση του Επαρχείου ο Μπέης της ευρύτερης περιοχής Γεώργιος Τσερνωτάς.",
        "links": [{
            "title": "Πύργος Ηλείας @ Βικιπαιδεία",
            "url": "https://el.wikipedia.org/wiki/%CE%89%CE%BB%CE%B9%CE%B4%CE%B1"
        }]
    }

    ];
    return {
        getDetailsByIndex: function(index){
            if(index === -1){
                return details[0];
            }
            else if(index === -2) {
                return details[1];
            }

            if(index > details.length-1){
                return false;
            }

            return details[index];
        },
        setDetailsByIndex: function(index, details) {
            details[index] = details;
        },
        setDetails: function(_details) {
            details = _details;
        },
        getDetails: function() {
            return details;
        }
    };
})();
