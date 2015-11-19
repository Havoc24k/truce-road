/**
 * HeaderView
 */

app.views.headerView = (function() {
	var _CONTAINER_NAME = 'header-view';
	var _page;

	////////////////////
	// DATA PROVIDERS //
	////////////////////
	function getData() {
		var data = {
			tab1: {
				"poi": [{
					"title": "Αρχαία Ήλιδα",
					"text": "Ένα από τα σημαντικότερα κέντρα της Πελοποννήσου στην αρχαιότητα, έφθασε σε ακμή τα ρωμαϊκά χρόνια, οπότε και κτίστηκε ένας μεγάλος αριθμός κτιρίων και κυρίως αθλητικών εγκαταστάσεων αφού στην Ήλιδα συνέρρεε πάντα το πλήθος των αθλητών για προπόνηση, ένα μήνα πριν από τους Ολυμπιακούς Αγώνες. Ήταν η διοργανώτρια πόλη των Ολυμπιακών Αγώνων και πρωτεύουσα των Ηλείων.",
					"links": [{
						"title": "Ήλιδα @ Βικιπαιδεία",
						"url": "https://el.wikipedia.org/wiki/%CE%89%CE%BB%CE%B9%CE%B4%CE%B1"
					}, {
						"title": "Ήλιδα @ ΟΔΥΣΣΕΥΣ",
						"url": "http://odysseus.culture.gr/h/3/gh351.jsp?obj_id=2400"
					}]
				}, {
					"title": "Πύργος",
					"text": "Στον ίδιο χώρο που βρίσκεται ο Πύργος σήμερα, τοποθετείται η Αρχαία πόλη Δυσπόντιο. Στα περίχωρα του Πύργου ήταν η αρχαία πόλη Λέτρινα, απ' όπου είχε πάρει και την ονομασία του σαν Δήμος Λετρίνων μέχρι την Δεκαετία του 1980. Η ονομασία της πόλης προέρχεται από τον πύργο που είχε κατασκευάσει, το 1512, στην θέση του Επαρχείου ο Μπέης της ευρύτερης περιοχής Γεώργιος Τσερνωτάς.",
					"links": [{
						"title": "Πύργος Ηλείας @ Βικιπαιδεία",
						"url": "https://el.wikipedia.org/wiki/%CE%89%CE%BB%CE%B9%CE%B4%CE%B1"
					}]
				}, {
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
					}]
				}, {
					"title": "Περισσότερες πληροφορίες",
					"text": "",
					"links": [{
						"title": "Ελληνική Ολυμπιακή Επιτροπή",
						"url": "http://www.hoc.gr/"
					}, {
						"title": "Official website of the Olympic Movement",
						"url": "http://www.olympic.org/"
					}]
				}]
			},
			tab2: {
				"phones": [{
					"title": "Χρήσιμες Πληροφορίες & Τηλέφωνα Νομού Ηλείας",
					"url": "http://pirgiotis.gr/index.php?option=com_content&view=article&id=5592&Itemid=205"
				}, {
					"title": "Κατηγορίες προσωπικών εξυπηρετήσεων / Personal Services",
					"url": "http://eventdrop.net/TheRouteOfTruce/Route-Personal%20Srvices.pdf"
				}],
				"regions": [{
					"name": "ΞΕΝΟΔΟΧΕΙΑ ΚΟΝΤΑ ΣΤΗΝ ΑΡΧΑΙΑ ΟΛΥΜΠΙΑ",
					"hotels": [{
						"name": "KRONION HOTEL",
						"url": "http://www.hotelsolympia.gr",
						"tel": "26240 22188",
						"rating": 2
					}, {
						"name": "PELOPS HOTEL",
						"url": "http://www.hotelpelops.gr",
						"tel": "26240 22543",
						"rating": 2
					}, {
						"name": "OINOMAOS HOTEL",
						"url": "http://www.hotelinomaos.gr",
						"tel": "26240 22056",
						"rating": 2
					}, {
						"name": "HERCULES HOTEL",
						"url": "http://www.hotelhercules.gr",
						"tel": "26240 22696",
						"rating": 2
					}, {
						"name": "POSIDON HOTEL",
						"url": "http://www.pensionposidon.gr",
						"tel": "26240 22567",
						"rating": 2
					}, {
						"name": "NEDA HOTEL",
						"url": "http://www.hotelneda.gr",
						"tel": "26240 22563",
						"rating": 3
					}, {
						"name": "ILIS HOTEL",
						"url": "http://www.olympiahotels.gr",
						"tel": "26240 22547",
						"rating": 3
					}, {
						"name": "ANTONIOS HOTEL",
						"url": "http://www.hotelantonios.gr",
						"tel": "26240 22348",
						"rating": 4
					}, {
						"name": "BEST WESTERN EUROPA",
						"url": "http://www.hoteleuropa.gr",
						"tel": "26240 22850",
						"rating": 4
					}, {
						"name": "OLYMPION ASTY HOTEL",
						"url": "http://www.olympionasty.gr",
						"tel": "26240 23665",
						"rating": 4
					}, {
						"name": "OLYMPIC VILLAGE HOTEL",
						"url": "http://www.hotelolvillage.gr",
						"tel": "26240 22212",
						"rating": 4
					}, {
						"name": "ARTY GRAND HOTEL",
						"url": "http://www.artygrandhotel.gr",
						"tel": "26240 26000",
						"rating": 5
					}, ]
				}, {
					"name": "ΞΕΝΟΔΟΧΕΙΑ ΣΤΗΝ ΠΕΡΙΟΧΗ ΤΗΣ ΑΡΧΑΙΑΣ ΟΛΥΜΠΙΑΣ",
					"hotels": [{
						"name": "AMALIAS HOTEL",
						"url": "http://www.amaliahotel.gr",
						"tel": "26220 38104",
						"rating": 3
					}, {
						"name": "CAMPING BUNGALOWS ΑΝΔΡΙΟΠΟΥΛΟΣ",
						"url": "http://www.campingkourouta-bungalows.gr",
						"tel": "26220 24921",
						"rating": 0
					}, {
						"name": "EΞΟΧΙΚΟ ΓΙΩΤΑ",
						"url": "",
						"tel": "26220 28151",
						"rating": 0
					}, {
						"name": "HOTEL OLYMPIC ΙΝΝ",
						"url": "",
						"tel": "26220 28334",
						"rating": 3
					}, {
						"name": "ILIDA KOYROYTA STUDIOS",
						"url": "http://www.kouroutastudios.gr",
						"tel": "26220 22564",
						"rating": "6977587876"
					}, {
						"name": "KOSTAS ROOMS",
						"url": "",
						"tel": "6977929439, 26220 29929",
						"rating": 0
					}, {
						"name": "KOYROYTA BEACH ΖΑΧΙΩΤΗΣ",
						"url": "http://www.kouroutahotel.gr",
						"tel": "26220 24024, 6979200200",
						"rating": 0
					}, {
						"name": "LORAS APARTMENTS",
						"url": "http://www.loras-apartments.gr",
						"tel": "26220 38610, 6972326349",
						"rating": 0
					}, {
						"name": "NIRIIDES APARTMENTS",
						"url": "http://www.niriides-kourouta.gr",
						"tel": "26220 21289, 6932560931",
						"rating": 0
					}, {
						"name": "OKTANA",
						"url": "",
						"tel": "26220 25510, 6989846742 ",
						"rating": 0
					}, {
						"name": "ROOM TO LET",
						"url": "http://www.stoubanou.gr",
						"tel": "26220 24550, 6972519801",
						"rating": 0
					}, {
						"name": "ΒΙΛΛΑ ΚΑΛΛΙΟΠΗ",
						"url": "http://www.villa-kalliopi.gr",
						"tel": "210 5723742, 6977805950",
						"rating": 0
					}, {
						"name": "ΓΙΑΝΝΑΚΟΠΟΥΛΟΣ ΔΗΜ",
						"url": "",
						"tel": "6976155451",
						"rating": 0
					}, {
						"name": "ΔΕΞΑΜΕΝΕΣ",
						"url": "http://www.dexamenes.com",
						"tel": "26220 25999, 6972521806",
						"rating": 0
					}, {
						"name": "ΖΟΡΜΠΑΣ-ΜΥΡΤΙΑ HOTEL",
						"url": "http://www.zorbashotel.eu",
						"tel": "26210 54238, 6979316744",
						"rating": 3
					}, {
						"name": "ΚΤΗΜΑ TERRY-LAND",
						"url": "",
						"tel": "6944384428",
						"rating": 0
					}, {
						"name": "ΚΤΗΜΑ ΚΑΡΥΔΙΕΣ ΔΟΥΝΕΙΚΑ",
						"url": "",
						"tel": "26220 92008, 6974753272",
						"rating": 0
					}, {
						"name": "ΠΑΝΟΥΤΣΟΠΟΥΛΟΣ ΓΙΩΡΓΟΣ",
						"url": "",
						"tel": "26220 27232, 6977703132",
						"rating": 0
					}, {
						"name": "ΣΤΟΥΝΤΙΟ ΕΥΡΥΔΙΚΗ",
						"url": "",
						"tel": "6979300930",
						"rating": 0
					}, {
						"name": "ΣΥΓΚΡΟΤΗΜΑ ΚΑΤΟΙΚΙΩΝ (ΨΥΧΟΓΙΟΣ)",
						"url": "",
						"tel": "26229 22930, 694615938",
						"rating": 0
					}, {
						"name": "ΤΖΙΟΒΑΝΙ ΜΑΡΕ",
						"url": "",
						"tel": "26220 22949, 6978049190",
						"rating": 0
					}, {
						"name": "ΤΡΙΚΑΛΙΩΤΗ ΕΛΕΝΗ",
						"url": "",
						"tel": "6938094255",
						"rating": 0
					}, ]
				}]
			}
		};

		return data;
	}

	/**
	 * [render description]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	function render(data) {
		return $.parseHTML(app.templateEngine.createHTML({
			name: _CONTAINER_NAME,
			container: $('#' + _CONTAINER_NAME),
			data: data,
			options: {
				addTemplate: false
			}
		}));
	}

	/**
	 * [setupHandlers description]
	 * @return {[type]} [description]
	 */
	function setupHandlers() {
		$('.back-to-map').bind('touchend click', function(e) {
			e.preventDefault();
			app.views.mapView.show();
		});
	}

	////////////////////
	//Event Handlers //
	////////////////////

	return {

		/**
		 * [show description]
		 * @return {[type]} [description]
		 */
		show: function() {
			// render
			_page = render({
				data: getData()
			});

			// slide page to view
			app.pageSlider.slidePage($(_page));

			// execute any extra code needed
			setupHandlers();

			$(document).foundation();
		},

		/**
		 * [hide description]
		 * @return {[type]} [description]
		 */
		hide: function() {
			$('#' + _CONTAINER_NAME).empty();
		}
	};
})();
