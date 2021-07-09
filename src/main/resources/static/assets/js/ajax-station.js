$(document).ready(function() {
	//add sation
	$("#stationCreate").click(function() {

		var stationName = $("#stationName").val();
		var stationActive = $("#stationActive").is(':checked')
		var json = {
			name: stationName,
			active: stationActive
		};
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/StationCreate",
			data: JSON.stringify(json),
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				//generate table data
				if (data == null) {
					
				}
				else {
					var dataTable = '<tr class="stationRow" id=' + data.id + '><td class="align-middle text-center"><span class=" text-sm font-weight-bold">' + data.name + '</span></td>';
					if (data.active == true) {
						dataTable += '<td class="align-middle text-center text-sm stationStatusActive" id="' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					}
					else {
						dataTable += '<td class="align-middle text-center text-sm stationStatusDisable" id="' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					}
					dataTable += '<td class="align-middle"><div class="ms-auto"><button class="btn btn-link text-danger text-gradient px-3 mb-0 stationDelete" id=' + data.id + '><i class="far fa-trash-alt me-2"></i>Delete</button>';
					if (data.active == false) {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 stationEnable" id=' + data.id + '><i class="fas fa-pencil-alt text-success me-2 " aria-hidden="true"></i>Enable</button>';
					}
					else {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 stationDisable" id=' + data.id + '><i class="fas fa-pencil-alt text-danger me-2 " aria-hidden="true"></i>Disable</button>';
					}
					dataTable += '</div></td></tr>';
					//add it to table
					$('#stationTable > tbody:last-child').append(dataTable);
					//show that statio add success
					var dataSuccess = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Station ' + data.name + ' has been added! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataSuccess);
					///add event for the button
					$('#' + data.id + ' .stationDelete').click(DeleteStation);
					$('#' + data.id + ' .stationEnable').click(EnableStation);
					$('#' + data.id + ' .stationDisable').click(DisableStation);
				}
			},
			error: function(e) {
				// if data is duplicate send error
					var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot add this station because it is already exists! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
			}
		});
	});
	//delete station
	$('.stationDelete').click(function() {
		var id = this.id;
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/StationDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data == null) {
					//send eror if null
					var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this station because it is currently in use! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
				} else {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Station ' + data.name + ' has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
					//delete table 
					$("#" + data.id+" .stationRow").remove();
				}
			},error: function(e){
					var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this station because it is already in use!! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
			}
		})
	});
	// enable station
	$('.stationEnable').click(function() {
		var id = this.id;
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/StationEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
			
				if (data == null) {
					//send eror if null
					var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this station! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
				} else {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Station ' + data.name + ' has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm stationStatusActive" id="' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 stationDisable" id="' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#" + data.id + ".stationEnable").replaceWith(dataRowEditColumn);
					$("#" + data.id + ".stationStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#' + data.id + ' .stationDisable').click(DisableStation);
				}
			},error: function(){
					var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this station because it is already in use!! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);}
		})
	});
	//disable station
	$('.stationDisable').click(function() {
		var id = this.id;
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/StationDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data == null) {
					//send eror if null
					var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this station! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
				} else {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Station ' + data.name + ' has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm stationStatusDisable" id="' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 stationEnable" id="' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#" + data.id + ".stationDisable").replaceWith(dataRowEditColumn);
					$("#" + data.id + ".stationStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#' + data.id + ' .stationEnable').click(EnableStation);
				}
			}
		})
	});
	//function delete for dynamic button
	function DeleteStation() {
		var id = this.id;
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/StationDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data == null) {
					//send eror if null
					var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this station because it is currently in use! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
				} else {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Station ' + data.name + ' has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
					//delete table 
					$("#" + data.id +".stationRow").remove();
				}
			}
		})
	}
	//function enable for dynamic button
	function EnableStation() {
			var id = this.id;
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/StationEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data == null) {
					//send eror if null
					var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this station! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
				} else {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Station ' + data.name + ' has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm stationStatusActive" id="' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 stationDisable" id="' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#" + data.id + ".stationEnable").replaceWith(dataRowEditColumn);
					$("#" + data.id + ".stationStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#' + data.id + ' .stationDisable').click(DisableStation);
				}
			},error: function(e){
				console.log(e);
			}
		})
	}
	//function disable for dynamic button
	function DisableStation() {
		var id = this.id;
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/StationDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data == null) {
					//send eror if null
					var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this station! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
				} else {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Station ' + data.name + ' has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#stationError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm stationStatusDisable" id="' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 stationEnable" id="' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#" + data.id + ".stationDisable").replaceWith(dataRowEditColumn);
					$("#" + data.id + ".stationStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#' + data.id + ' .stationEnable').click(EnableStation);
				}
			}
		})
	}
	//// not ajax but this is function of search train
	$(document).ready(function() {
		$("#stationSearch").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#stationTable tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});
}
);