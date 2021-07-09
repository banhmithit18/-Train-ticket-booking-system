$(document).ready(function() {
	//add seat type
	$("#seattypeCreate").click(function() {

		var seattypeName = $("#seattypeName").val();
		var seattypeActive = $("#seattypeActive").is(':checked')
		var seattypeDescription = $("#seattypeDescription").val();
		var json = {
			name: seattypeName,
			description: seattypeDescription,
			active: seattypeActive
		};
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatTypeCreate",
			data: JSON.stringify(json),
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//generate table data
					var dataTable = '<tr id="st' + data.id + '"><td class="align-middle text-center"><span class=" text-sm font-weight-bold">' + data.name + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.description + '</span></td>';
					if (data.active == true) {
						dataTable += '<td class="align-middle text-center text-sm seattypeStatusActive" id="st' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					}
					else {
						dataTable += '<td class="align-middle text-center text-sm seattypeStatusDisable" id="st' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Inactive</span></td>';
					}
					dataTable += '<td class="align-middle"><div class="ms-auto"><button class="btn btn-link text-danger text-gradient px-3 mb-0 seattypeDelete" id="t' + data.id + '"><i class="far fa-trash-alt me-2"></i>Delete</button>';
					if (data.active == false) {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 seattypeEnable" id="st' + data.id + '"><i class="fas fa-pencil-alt text-success me-2 " aria-hidden="true"></i>Enable</button>';
					}
					else {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 seattypeDisable" id="st' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2 " aria-hidden="true"></i>Disable</button>';
					}
					dataTable += '</div></td></tr>';
					//add it to table
					$('#seattypeTable > tbody:last-child').append(dataTable);
					//show that statio add success
					var dataSuccess = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat type ' + data.name + ' has been added! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seattypeError').append(dataSuccess);
					///add event for the button
					$('#st' + data.id + ' .seattypeDelete').click(DeleteSeatType);
					$('#st' + data.id + ' .seattypeEnable').click(EnableSeatType);
					$('#st' + data.id + ' .seattypeDisable').click(DisableSeatType);
				}
			},
			error: function(e) {
				// if data is duplicate send error
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot add this seat type because it is already exists! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seattypeError').append(dataError);
			}
		});
	});
	//delete seat type
	$('.seattypeDelete').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatTypeDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					console.log(data)
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat type ' + data.name + ' has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seattypeError').append(dataError);
					//delete table 
					$("#st" + data.id).remove();
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this seat type because it is currently in use!! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seattypeError').append(dataError);
			}
		})
	});
	// enable seat type
	$('.seattypeEnable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatTypeEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat type ' + data.name + ' has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seattypeError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm seattypeStatusActive" id="st' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 seattypeDisable" id="st' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#st" + data.id + ".seattypeEnable").replaceWith(dataRowEditColumn);
					$("#st" + data.id + ".seattypeStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#st' + data.id + ' .seattypeDisable').click(DisableSeatType);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this seattype! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seattypeError').append(dataError);
			}
		})
	});
	//disable seat type
	$('.seattypeDisable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatTypeDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat type ' + data.name + ' has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seattypeError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm seattypeStatusDisable" id="st' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Inactive</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 seattypeEnable" id="st' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#st" + data.id + ".seattypeDisable").replaceWith(dataRowEditColumn);
					$("#st" + data.id + ".seattypeStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#st' + data.id + ' .seattypeEnable').click(EnableSeatType);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this seat type! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seattypeError').append(dataError)
			}
		})
	});
	//function delete for dynamic button
	function DeleteSeatType() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatTypeDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat type ' + data.name + ' has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seattypeError').append(dataError);
					//delete table 
					$("#st" + data.id).remove();
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this seat type because it is currently in use!! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seattypeError').append(dataError);
			}
		})
	}
	//function enable for dynamic button
	function EnableSeatType() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatTypeEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat type ' + data.name + ' has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seattypeError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm seattypeStatusActive" id="st' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 seattypeDisable" id="st' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#st" + data.id + ".seattypeEnable").replaceWith(dataRowEditColumn);
					$("#st" + data.id + ".seattypeStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#st' + data.id + ' .seattypeDisable').click(DisableSeatType);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this seat type! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seattypeError').append(dataError);
			}
		})
	}
	//function disable for dynamic button
	function DisableSeatType() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(2);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/SeatTypeDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Seat type ' + data.name + ' has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#seattypeError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm seattypeStatusDisable" id="st' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Inactive</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 seattypeEnable" id="st' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#st" + data.id + ".seattypeDisable").replaceWith(dataRowEditColumn);
					$("#st" + data.id + ".seattypeStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#st' + data.id + ' .seattypeEnable').click(EnableSeatType);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this seat type! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#seattypeError').append(dataError)
			}
		})
	}
	//// not ajax but this is function of search seat type
	$(document).ready(function() {
		$("#seattypeSearch").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#seattypeTable tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});
}
);