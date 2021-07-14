$(document).ready(function() {
	//add train
	$("#trainCreate").click(function() {

		var trainName = $("#trainName").val();
		var trainActive = $("#trainActive").is(':checked')
		var trainSerialNumber = $("#trainSerialNumber").val();
		var json = {
			name: trainName,
			serialnumber: trainSerialNumber,
			active: trainActive
		};
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/TrainCreate",
			data: JSON.stringify(json),
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//generate table data
					var dataTable = '<tr id="t' + data.id + '"><td class="align-middle text-center"><span class=" text-sm font-weight-bold">' + data.name + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.serialnumber + '</span></td>';
					if (data.active == true) {
						dataTable += '<td class="align-middle text-center text-sm trainStatusActive" id="t' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					}
					else {
						dataTable += '<td class="align-middle text-center text-sm trainStatusDisable" id="t' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					}
					dataTable += '<td class="align-middle"><div class="ms-auto"><button class="btn btn-link text-danger text-gradient px-3 mb-0 trainDelete" id="t' + data.id + '"><i class="far fa-trash-alt me-2"></i>Delete</button>';
					if (data.active == false) {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 trainEnable" id="t' + data.id + '"><i class="fas fa-pencil-alt text-success me-2 " aria-hidden="true"></i>Enable</button>';
					}
					else {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 trainDisable" id="t' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2 " aria-hidden="true"></i>Disable</button>';
					}
					dataTable += '</div></td></tr>';
					//add it to table
					$('#trainTable > tbody:last-child').append(dataTable);
					//show that statio add success
					var dataSuccess = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Train ' + data.name + ' has been added! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#trainError').append(dataSuccess);
					///add event for the button
					$('#t' + data.id + ' .trainDelete').click(DeleteTrain);
					$('#t' + data.id + ' .trainEnable').click(EnableTrain);
					$('#t' + data.id + ' .trainDisable').click(DisableTrain);
					//set value
					$("#trainName").val('');
				}
			},
			error: function(e) {
				// if data is duplicate send error
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot add this train because it is already exists! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#trainError').append(dataError);
			}
		});
	});
	//delete train
	$('.trainDelete').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/TrainDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					console.log(data)
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Train ' + data.name + ' has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#trainError').append(dataError);
					//delete table 
					$("#t" + data.id).remove();
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this train because it is currently in use!! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#trainError').append(dataError);
			}
		})
	});
	// enable train
	$('.trainEnable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/TrainEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Train ' + data.name + ' has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#trainError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm trainStatusActive" id="t' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 trainDisable" id="t' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#t" + data.id + ".trainEnable").replaceWith(dataRowEditColumn);
					$("#t" + data.id + ".trainStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#t' + data.id + ' .trainDisable').click(DisableTrain);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this train! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#trainError').append(dataError);
			}
		})
	});
	//disable train
	$('.trainDisable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/TrainDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Train ' + data.name + ' has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#trainError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm trainStatusDisable" id="t' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 trainEnable" id="t' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#t" + data.id + ".trainDisable").replaceWith(dataRowEditColumn);
					$("#t" + data.id + ".trainStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#t' + data.id + ' .trainEnable').click(EnableTrain);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this train! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#trainError').append(dataError)
			}
		})
	});
	//function delete for dynamic button
	function DeleteTrain() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/TrainDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Train ' + data.name + ' has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#trainError').append(dataError);
					//delete table 
					$("#t" + data.id).remove();
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this train because it is currently in use!! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#trainError').append(dataError);
			}
		})
	}
	//function enable for dynamic button
	function EnableTrain() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/TrainEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Train ' + data.name + ' has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#trainError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm trainStatusActive" id="t' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 trainDisable" id="t' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#t" + data.id + ".trainEnable").replaceWith(dataRowEditColumn);
					$("#t" + data.id + ".trainStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#t' + data.id + ' .trainDisable').click(DisableTrain);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this train! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#trainError').append(dataError);
			}
		})
	}
	//function disable for dynamic button
	function DisableTrain() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/TrainDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Train ' + data.name + ' has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#trainError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm trainStatusDisable" id="t' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 trainEnable" id="t' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#t" + data.id + ".trainDisable").replaceWith(dataRowEditColumn);
					$("#t" + data.id + ".trainStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#t' + data.id + ' .trainEnable').click(EnableTrain);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this train! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#trainError').append(dataError)
			}
		})
	}
	//// not ajax but this is function of search train
	$(document).ready(function() {
		$("#trainSearch").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#trainTable tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});
}
);