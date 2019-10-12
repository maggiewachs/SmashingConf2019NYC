---
title: Product table
datasrc: productdata
layout: templates/component.njk
---


Product tables provide a complete list of our product inventory, availability, and identifying information for each product. *In this section include information that relates to your content to underscore why it's used and needed, and which tasks require it.*

<style>
/* Component styles -- 
	in a real project these would be grouped with your project code (they're in the page here for simplicity) */
.product-data {
	border-spacing: 0;
	border-collapse: collapse;
}
.product-data td,
.product-data th {
	text-align: left;
	vertical-align: top;
	padding-left: 10px;
	padding-right: 10px;
	border-bottom: 1px solid #f0f0f0;
}
.product-data .num {
	text-align: right;
}
.product-data .highlightrows tr:nth-child(odd) td {
	background-color: #dbf5fc;
}
.product-data tfoot td {
	font-size: .8125em;
	color: #888;
}
/* global spacing classes for our example site */
.spacing-compact th,
.spacing-compact td {
	padding-top: 6px;
	padding-bottom: 6px;
}
.spacing-spacious th,
.spacing-spacious td {
	padding-top: 12px;
	padding-bottom: 12px;
}
/* end component styles*/
</style>


## Code 

<div id="demo">
<div v-xrayhtml>
<table :class="{{datasrc}}.baseclass + ' spacing-' + spacing">
	<caption class="a11y-only"></caption>
	<tfoot>
		<tr>
			<td colspan="6">Last updated: <span :class="{{datasrc}}.baseclass + '_updated'" v-html="{{datasrc}}.lastupdated"></span></td>
		</tr>
	</tfoot>
	<thead>
		<tr>
			<th scope="col">ID</th>
			<th scope="col">Name</th>
			<th scope="col">Description</th>
			<th scope="col">Location</th>
			<th scope="col">Quantity</th>
			<th scope="col">Unit price</th>
		</tr>
	</thead>
	<tbody :class="{{datasrc}}.classes.rows.enabled === true ? {{datasrc}}.classes.rows.text : ''">
		<tr v-for="(product, i) in {{datasrc}}.products">
			<td v-html="product.id"></td>
			<td v-html="product.name"></td>
			<td v-html="product.description"></td>
			<td v-html="product.location"></td>
			<td class="num" v-html="product.qty"></td>
			<td class="num" v-html="product.unitprice"></td>
		</tr>
	</tbody>
</table>
</div>

<form class="api-form" data-demo-form>
<h3>Configuration options</h3>
<fieldset>
	<label>
		<input type="checkbox" v-model="{{datasrc}}.classes.rows.enabled">
		<span class="check-radio-text"><b>Highlight rows</b> - alternate row background colors to increase legibility</span>
	</label>
</fieldset>

<fieldset>
	<b class="label-text">Vertical spacing</b>
	<label>
		<input type="radio" v-model="spacing" value="compact">
		<span class="check-radio-text"><b>Compact</b> - less row padding to show more data on the screen</span>
	</label><br>
	<label>
		<input type="radio" v-model="spacing" value="spacious">
		<span class="check-radio-text"><b>Spacious</b> - more row padding for added legibility</span>
	</label>
</fieldset>

<fieldset>
	<label>
		<b class="label-text">Last updated date</b>
		<input type="text" v-model="{{datasrc}}.lastupdated">
	</label>
</fieldset>

<h3>Classes</h3>

<table class="api-table">
	<caption class="a11y-only">CSS classes with form controls for configuring the code example and demo on this page.</caption>
	<thead>
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Use</th>
			<th>Shown in demo</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>.<span v-html="{{datasrc}}.baseclass"></span></code></td>
			<td><b>Required</b> - Base class that scopes product-specific styles to the data table</td>
			<td>Assigned to <code>&lt;table></code> element</td>
			<td><em>Always shown</em></td>
		</tr>
		<tr>
			<td><code>.<span v-html="{{datasrc}}.classes.rows.text"></span></code></td>
			<td>Alternates row colors to increase legibility</td>
			<td>Assigned to <code>&lt;tbody></code> element</td>
			<td><span v-if="{{datasrc}}.classes.rows.enabled">Yes</span><span v-else>No</span></td>
		</tr>
	</tbody>
</table>

<h3>API data</h3>
<p>All are scoped to the global <code>appdata</code> Object.</p>

<table class="api-table">
	<caption class="a11y-only">Data values with form controls for configuring the code example and demo on this page.</caption>
	<thead>
		<tr>
			<th>Name</th>
			<th>Description</th>
			<th>Type</th>
			<th>Use</th>
			<th>Shown in demo</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td><code>spacing</code></td>
			<td>Controls vertical row padding</td>
			<td><code>string</code></td>
			<td><p>Accepts the following values:</p>
				<ul>
					<li><code>compact</code> - less row padding to show more data on the screen</li>
					<li><code>spacious</code> - more row padding for added legibility</li>
				</ul>
			</td>
			<td><code v-html="spacing"></code></td>
		</tr>
		<tr>
			<td><code>{{datasrc}}.lastupdated</code></td>
			<td>Date and time of the last inventory update</td>
			<td>Date <code>string</code></td>
			<td><p>Accepts the format: <code style="white-space: nowrap;">DD Month YYYY HH:MM:SS</code></p></td>
			<td><code v-html="{{datasrc}}.lastupdated"></code></p></td>
		</tr>
	</tbody>
</table>
</form>
</div><!-- /demo -->


## Other things to include on a component page:{.rules}

* any exceptions to general installation or set up instructions
* usage information
* contribution guidelines, including a11y and performance acceptance criteria
* link to JSbin or sandbox for prototyping
* status and version history (links to repositories are nice, too)
* related components 


