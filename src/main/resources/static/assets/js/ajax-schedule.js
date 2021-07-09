$(document).ready(function() {
	//add schedule
	$("#scheduleCreate").click(function() {

		var scheduleRoutine = $("#scheduleRoutine").val();
		var scheduleDate = $("#scheduleDate").val();
		var scheduleActive = false;
		var schedulePrice = $('#schedulePrice').val();
		var json = {
			routineId: scheduleRoutine,
			date: scheduleDate,
			price: schedulePrice,
			active: scheduleActive
		};
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/ScheduleCreate",
			data: JSON.stringify(json),
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					console.log(data);
					//generate table data
					var dataTable = '<tr id="sc' + data.id + '"><td class="align-middle text-center"><span class=" text-sm font-weight-bold">' + data.routine + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.date + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.price + '</span></td>';
  
					if (data.active == true) {
						dataTable += '<td class="align-middle text-center text-sm scheduleStatusActive" id="sc' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';

					}
					else {
						dataTable += '<td class="align-middle text-center text-sm scheduleStatusDisable" id="sc' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Postponed</span></td>';
					}
					dataTable +='<td class="align-middle"><div class="ms-auto">';
					if (data.active == false) {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 scheduleEnable" id="sc' + data.id + '"><i class="fas fa-pencil-alt text-success me-2 " aria-hidden="true"></i>Enable</button>';
					}
					else {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 scheduleDisable" id="sc' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2 " aria-hidden="true"></i>Disable</button>';
					}
					dataTable += '</div></td></tr>';
					//add it to table
					$('#scheduleTable > tbody:last-child').append(dataTable);
					//show that statio add success
					var dataSuccess = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Schedule has been added! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#scheduleError').append(dataSuccess);
					///add event for the button
					$('#sc' + data.id + ' .scheduleEnable').click(EnableSchedule);
					$('#sc' + data.id + ' .scheduleDisable').click(DisableSchedule);
				}
			},
			error: function(e) {
				// if data is duplicate send error
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot add this schedule! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#scheduleError').append(dataError);
			}
		});
	});
	// enable schedule
	$('.scheduleEnable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/ScheduleEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Schedule has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#scheduleError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm scheduleStatusActive" id="sc' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 scheduleDisable" id="sc' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#sc" + data.id + ".scheduleEnable").replaceWith(dataRowEditColumn);
					$("#sc" + data.id + ".scheduleStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#sc' + data.id + ' .scheduleDisable').click(DisableSchedule);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this schedule! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#scheduleError').append(dataError);
			}
		})
	});
	//disable schedule
	$('.scheduleDisable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/ScheduleDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Schedule has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#scheduleError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm scheduleStatusDisable" id="sc' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 scheduleEnable" id="sc' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#sc" + data.id + ".scheduleDisable").replaceWith(dataRowEditColumn);
					$("#sc" + data.id + ".scheduleStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#sc' + data.id + ' .scheduleEnable').click(EnableSchedule);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this schedule! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#scheduleError').append(dataError)
			}
		})
	});
	//function delete for dynamic button

	//function enable for dynamic button
	function EnableSchedule() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/ScheduleEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Schedule has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#scheduleError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm scheduleStatusActive" id="sc' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 scheduleDisable" id="sc' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#sc" + data.id + ".scheduleEnable").replaceWith(dataRowEditColumn);
					$("#sc" + data.id + ".scheduleStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#sc' + data.id + ' .scheduleDisable').click(DisableSchedule);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this schedule! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#scheduleError').append(dataError);
			}
		})
	}
	//function disable for dynamic button
	function DisableSchedule() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/ScheduleDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Schedule has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#scheduleError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm scheduleStatusDisable" id="sc' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 scheduleEnable" id="sc' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#sc" + data.id + ".scheduleDisable").replaceWith(dataRowEditColumn);
					$("#sc" + data.id + ".scheduleStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#sc' + data.id + ' .scheduleEnable').click(EnableSchedule);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this schedule! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#scheduleError').append(dataError)
			}
		})
	}
	//// not ajax but this is function of search train
	$(document).ready(function() {
		$("#scheduleSearch").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#scheduleTable tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});
}
);