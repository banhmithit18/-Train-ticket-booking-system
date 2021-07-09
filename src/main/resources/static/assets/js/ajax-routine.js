$(document).ready(function() {
	//add routine
	$("#routineCreate").click(function() {

		var routineTrain = $("#routineTrain").val();
		var routineName = $("#routineName").val();
		var routineStationStart = $("#routineStationStart").val();
		var routineStationEnd = $("#routineStationEnd").val();
		var routineDepartureTime = $("#routineDepartureTime").val();
	    routineDepartureTime +=":00";
		var routineArrivalTime = $("#routineArrivalTime").val();
		routineArrivalTime +=":00";
		var routineDistance = $("#routineDistance").val();
		var routineActive = $("#routineActive").is(':checked');
		var json = {
			name: routineName,
			trainId: routineTrain,
			stationStart: routineStationStart,
			stationEnd: routineStationEnd,
			departureTime: routineDepartureTime,
			arrivalTime: routineArrivalTime,
			distance: routineDistance,
			active: routineActive
		};
		console.log(json);
		console.log(JSON.stringify(json));
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/RoutineCreate",
			data: JSON.stringify(json),
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					console.log(data);
					//generate table data
					var dataTable = '<tr id="r' + data.id + '"><td class="align-middle text-center"><span class=" text-sm font-weight-bold">' + data.name + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.train + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.stationStart + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.stationEnd + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.departureTime + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.arrivalTime + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.distance + '</span></td>';

					if (data.active == true) {
						dataTable += '<td class="align-middle text-center text-sm routineStatusActive" id="r' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					}
					else {
						dataTable += '<td class="align-middle text-center text-sm routineStatusDisable" id="r' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					}
					dataTable += '<td class="align-middle"><div class="ms-auto"><button class="btn btn-link text-danger text-gradient px-3 mb-0 routineDelete" id="r' + data.id + '"><i class="far fa-trash-alt me-2"></i>Delete</button>';
					if (data.active == false) {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 routineEnable" id="r' + data.id + '"><i class="fas fa-pencil-alt text-success me-2 " aria-hidden="true"></i>Enable</button>';
					}
					else {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 routineDisable" id="r' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2 " aria-hidden="true"></i>Disable</button>';
					}
					dataTable += '</div></td></tr>';
					//add it to table
					$('#routineTable > tbody:last-child').append(dataTable);
					//show that statio add success
					var dataSuccess = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Routine has been added! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#routineError').append(dataSuccess);
					///add event for the button
					$('#r' + data.id + ' .routineDelete').click(DeleteRoutine);
					$('#r' + data.id + ' .routineEnable').click(EnableRoutine);
					$('#r' + data.id + ' .routineDisable').click(DisableRoutine);
				}
			},
			error: function(e) {
				// if data is duplicate send error
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot add this routine because it is already exists! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#routineError').append(dataError);
			}
		});
	});
	//delete routine
	$('.routineDelete').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/RoutineDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Routine has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#routineError').append(dataError);
					//delete table 
					$("#r" + data.id).remove();
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this routine  because it is currently in use!! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#routineError').append(dataError);
			}
		})
	});
	// enable routine
	$('.routineEnable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/RoutineEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Routine has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#routineError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm routineStatusActive" id="r' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 routineDisable" id="r' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#r" + data.id + ".routineEnable").replaceWith(dataRowEditColumn);
					$("#r" + data.id + ".routineStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#r' + data.id + ' .routineDisable').click(DisableRoutine);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this routine! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#routineError').append(dataError);
			}
		})
	});
	//disable routine
	$('.routineDisable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/RoutineDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Routine has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#routineError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm routineStatusDisable" id="r' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 routineEnable" id="r' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#r" + data.id + ".routineDisable").replaceWith(dataRowEditColumn);
					$("#r" + data.id + ".routineStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#r' + data.id + ' .routineEnable').click(EnableRoutine);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this routine! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#routineError').append(dataError)
			}
		})
	});
	//function delete for dynamic button
	function DeleteRoutine() {
			var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/RoutineDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Routine has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#routineError').append(dataError);
					//delete table 
					$("#r" + data.id).remove();
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this routine  because it is currently in use!! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#routineError').append(dataError);
			}
		})
	}
	//function enable for dynamic button
	function EnableRoutine() {
			var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/RoutineEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Routine has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#routineError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm routineStatusActive" id="r' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 routineDisable" id="r' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#r" + data.id + ".routineEnable").replaceWith(dataRowEditColumn);
					$("#r" + data.id + ".routineStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#r' + data.id + ' .routineDisable').click(DisableRoutine);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this routine! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#routineError').append(dataError);
			}
		})
	}
	//function disable for dynamic button
	function DisableRoutine() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/RoutineDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Routine has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#routineError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm routineStatusDisable" id="r' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 routineEnable" id="r' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#r" + data.id + ".routineDisable").replaceWith(dataRowEditColumn);
					$("#r" + data.id + ".routineStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#r' + data.id + ' .routineEnable').click(EnableRoutine);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this routine! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#routineError').append(dataError)
			}
		})
	}
	//// not ajax but this is function of search routine
	$(document).ready(function() {
		$("#routineSearch").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#routineTable tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});
}
);