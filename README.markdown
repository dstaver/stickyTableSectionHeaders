# Usage

Basic options
	$('table').stickyTableSectionHeaders();

Settings and defaults
	$('table').stickyTableSectionHeaders({
		rowSelector      : 'tr.sticky',
		headlineSelector : 'th'
	});

Requires basic HTML structure
    <table>
    	<thead>
    		<th colspan="3">Table</th>
    	</thead>
        <tbody>
        	<tr class="sticky">
        	    <th>Company</th>
        	    <th>Name</th>
        	    <th>Phone</th>
        	</tr>
        	<tr>
        	    <td>in,</td>
        	    <td>Naida Ashley</td>
        	    <td>22 69 62 66</td>
        	</tr>
        	<tr>
        	    <td>nisi a</td>
        	    <td>Eaton Petty</td>
        	    <td>22 88 94 57</td>
        	</tr>
        	<tr>
        	    <td>scelerisque scelerisque</td>
        	    <td>Harlan Mays</td>
        	    <td>22 55 12 08</td>
        	</tr>
        	<tr class="sticky">
        	    <th>Company</th>
        	    <th>Name</th>
        	    <th>Phone</th>
        	</tr>
        	<tr>
        	    <td>in,</td>
        	    <td>Naida Ashley</td>
        	    <td>22 69 62 66</td>
        	</tr>
        	<tr>
        	    <td>nisi a</td>
        	    <td>Eaton Petty</td>
        	    <td>22 88 94 57</td>
        	</tr>
        	<tr>
        	    <td>scelerisque scelerisque</td>
        	    <td>Harlan Mays</td>
        	    <td>22 55 12 08</td>
        	</tr>
		</tbody>
	</table>
