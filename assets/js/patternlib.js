
var componentComputedData, componentMethods;

// get un-vue'd markup from the start
var editorElement = document.getElementById( "demo" );
var templateElement = document.querySelector("[data-xrayhtml],[data-xrayhtml-iframe]") || editorElement.firstElementChild;
var vuetemplate = editorElement ? templateElement.innerHTML : "";

// return a freshly rendered vue template using the initially saved markup
function getTemplateMarkup(){
	var id = "tempvue";
	var tempVue = jQuery( "<div id='" + id + "' style='display:none'></div>" ).html( vuetemplate ).appendTo( "body" );
	var vm = new Vue({
		el: '#' + id,
		data: typeof data !== "undefined" ? data : {},
		computed: componentComputedData,
		methods: componentMethods,
		comments: true
	});

	var newOutput = document.getElementById(id).innerHTML;
	jQuery( document.getElementById(id) ).remove();
	vm.$destroy();

	return newOutput;
}


(function($) {

	/* xrayhtml */
	function xrayMarkupCleanup(html, keepPrefixes) {
		if( !html ) {
			return html;
		}

		// replace a bunch of empty <!---->
		html = html.replace(/<\!---->/g, "");

		// clean up class attributes
		html = html.replace(/ class=".*\s{2,}[^\"]*"/g, function(str) { return str.replace(/\s{2,}/g, ' '); });
		// html = html.replace(/ class="(.*)\s"/g, ' class="$1"');
		// html = html.replace(/ class="\s(.*)"/g, ' class="$1"');

		return html_beautify(html);
	}

	function splitCode($source, html) {
		var newPre = document.createElement("pre");
		var highlightFound = false;
		var highlightClass = "xrayhtml-highlight";
		var lowlightClass = "xrayhtml-lowlight";

		html.split("<!-- CODE_SPLIT -->").forEach(function(subHtml, j) {
			var newCode = document.createElement("code");
			var highlightTest = /<!--\s*CODE_SPLIT_HIGHLIGHT\:*([^-]*)-->/;
			var highlightMatch = subHtml.match(highlightTest);
			if( highlightMatch ) {
				var namedLabel = highlightMatch.length > 1 ? highlightMatch[1].trim() : "";
				var keyword = namedLabel.replace("MODULE ", "").replace(" PRODUCT GRID", "");
				var componentLabel = namedLabel || "INNER COMPONENT";

				subHtml = subHtml.replace(highlightTest, "<!-- START: " + componentLabel + " -->") + "<!-- END: " + componentLabel + " -->\n";
				newCode.classList.add(highlightClass);
				highlightFound = true;
			}
			newCode.appendChild(document.createTextNode(subHtml));

			if(keyword) {
				newCode.setAttribute("data-copy-keyword", keyword);
			}

			newPre.appendChild(newCode);
		});

		if( highlightFound ) {
			$(newPre).find("code").not("." + highlightClass).addClass(lowlightClass);
		}

		$source.empty().append(newPre);
	}

	Vue.directive('xrayhtml', {
		inserted: function(el) {
			$(el).attr("data-xrayhtml", "").each(function() {
				var $this = $(this);
				var html = xrayMarkupCleanup(getTemplateMarkup());
				var $source = $("<div class='source-panel'>" + html + "</div>");
				$this.append($source);
				$this.xrayhtml();

				var $panel = $this.find(".source-panel");
				splitCode($panel, html);

				$panel.trigger("xrayhtml-vue-inserted");
			});
		},

		componentUpdated: function(el) {
			var $parent = $( el );
			var $snippet = $parent.find(".snippet");
			var $source = $parent.find(".source-panel");

			if( !$snippet.length ) {
				return;
			}

			var rawHtml = getTemplateMarkup();

			// only pass the prefixedHtml to the iframe for live DOM preview
			var prefixedHtml = xrayMarkupCleanup(rawHtml, true);

			// use html with prefixes removed for markup display
			var html = xrayMarkupCleanup(rawHtml);
			splitCode($source, html);

			// tell the jsbin link that there was a content change
			$parent
				.siblings("[data-modulecreator-form]")
				.find(".btn-jsbin")
				.trigger("changed");

			var $iframe = $parent.find("iframe");
			// TODO this should be a method call to the xray component, we're
			// using two constants here which we know because we can look at the
			// template and where the ifram ID is stored
			$iframe.length && $iframe[0].contentWindow.postMessage({
				selector: "#maincontent",
				html: prefixedHtml,
				id: $parent.data("id.xrayhtml")
			}, "*");
		}
	});

})(window.jQuery);