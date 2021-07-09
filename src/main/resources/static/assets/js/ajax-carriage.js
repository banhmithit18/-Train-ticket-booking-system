$(document).ready(function() {
	//add carriage
	$("#carriageCreate").click(function() {

		var carriageName = $("#carriageName").val();
		var carriageActive = $("#carriageActive").is(':checked')
		var carriageTrain = $("#carriageTrain").val();
		var carriageSeatAmount = $("#carriageSeatAmount").val();
		var json = {
			name: carriageName,
			trainid: carriageTrain,
			seatamount: carriageSeatAmount,
			active: carriageActive
		};
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/CarriageCreate",
			data: JSON.stringify(json),
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//generate table data
					var dataTable = '<tr id="c' + data.id + '"><td class="align-middle text-center"><span class=" text-sm font-weight-bold">' + data.name + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.train + '</span></td>';
					dataTable += '<td class="align-middle text-center"><span class="text-secondary text-xs font-weight-bold">' + data.seat + '</span></td>';

					if (data.active == true) {
						dataTable += '<td class="align-middle text-center text-sm carriageStatusActive" id="c' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					}
					else {
						dataTable += '<td class="align-middle text-center text-sm carriageStatusDisable" id="c' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					}
					dataTable += '<td class="align-middle"><div class="ms-auto"><button class="btn btn-link text-danger text-gradient px-3 mb-0 carriageDelete" id="c' + data.id + '"><i class="far fa-trash-alt me-2"></i>Delete</button>';
					if (data.active == false) {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 carriageEnable" id="c' + data.id + '"><i class="fas fa-pencil-alt text-success me-2 " aria-hidden="true"></i>Enable</button>';
					}
					else {
						dataTable += '<button class="btn btn-link text-dark px-3 mb-0 carriageDisable" id="c' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2 " aria-hidden="true"></i>Disable</button>';
					}
					dataTable += '</div></td></tr>';
					//add it to table
					$('#carriageTable > tbody:last-child').append(dataTable);
					//show that statio add success
					var dataSuccess = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Carriage ' + data.name + ' has been added! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#carriageError').append(dataSuccess);
					///add event for the button
					$('#c' + data.id + ' .carriageDelete').click(DeleteCarriage);
					$('#c' + data.id + ' .carriageEnable').click(EnableCarriage);
					$('#c' + data.id + ' .carriageDisable').click(DisableCarriage);
				}
			},
			error: function(e) {
				// if data is duplicate send error
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot add this carriage because it is already exists! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#carriageError').append(dataError);
			}
		});
	});
	//delete carriage
	$('.carriageDelete').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/CarriageDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					console.log(data)
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Carriage ' + data.name + ' has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#carriageError').append(dataError);
					//delete table 
					$("#c" + data.id).remove();
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this carriage because it is currently in use!! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#carriageError').append(dataError);
			}
		})
	});
	// enable carriage
	$('.carriageEnable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/CarriageEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Carriage ' + data.name + ' has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#carriageError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm carriageStatusActive" id="c' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 carriageDisable" id="c' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#c" + data.id + ".carriageEnable").replaceWith(dataRowEditColumn);
					$("#c" + data.id + ".carriageStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#c' + data.id + ' .carriageDisable').click(DisableCarriage);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this carriage! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#carriageError').append(dataError);
			}
		})
	});
	//disable carriage
	$('.carriageDisable').click(function() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/CarriageDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Carriage ' + data.name + ' has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#carriageError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm carriageStatusDisable" id="c' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 carriageEnable" id="c' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#c" + data.id + ".carriageDisable").replaceWith(dataRowEditColumn);
					$("#c" + data.id + ".carriageStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#c' + data.id + ' .carriageEnable').click(EnableCarriage);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this carriage! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#carriageError').append(dataError)
			}
		})
	});
	//function delete for dynamic button
	function DeleteCarriage() {
		var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);

		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/CarriageDelete",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					console.log(data)
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Carriage ' + data.name + ' has been deleted  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#carriageError').append(dataError);
					//delete table 
					$("#c" + data.id).remove();
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot delete this carriage because it is currently in use!! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#carriageError').append(dataError);
			}
		})
	}
	//function enable for dynamic button
	function EnableCarriage() {
			var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/CarriageEnable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Carriage ' + data.name + ' has been enabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#carriageError').append(dataError);
					//change status row

					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm carriageStatusActive" id="c' + data.id + '"><span class="badge badge-sm bg-gradient-success">Active</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 carriageDisable" id="c' + data.id + '"><i class="fas fa-pencil-alt text-danger me-2"aria-hidden="true"></i>Disable </button>';
					//replace current row
					$("#c" + data.id + ".carriageEnable").replaceWith(dataRowEditColumn);
					$("#c" + data.id + ".carriageStatusDisable").replaceWith(dataRowStatusColumn);
					//add event
					$('#c' + data.id + ' .carriageDisable').click(DisableCarriage);
				}
			}, error: function() {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot enable this carriage! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#carriageError').append(dataError);
			}
		})
	}
	//function disable for dynamic button
	function DisableCarriage() {
	var idWithString = this.id;
		//substring to get the id only
		var id = idWithString.substr(1);
		$.ajax({
			type: "POST",
			contentType: "application/json",
			url: "/CarriageDisable",
			data: id,
			dataType: 'json',
			cache: false,
			timeout: 600000,
			success: function(data) {
				console.log(data);
				if (data != null) {
					//send infor if success
					var dataError = '<div class="alert alert-success alert-dismissible fade show" role="alert"> <strong>Success!</strong> Carriage ' + data.name + ' has been disabled  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
					$('#carriageError').append(dataError);
					//change status row
					//generate row
					var dataRowStatusColumn = '<td class="align-middle text-center text-sm carriageStatusDisable" id="c' + data.id + '"><span class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>';
					var dataRowEditColumn = '<button class="btn btn-link text-dark px-3 mb-0 carriageEnable" id="c' + data.id + '"><i class="fas fa-pencil-alt text-success me-2"aria-hidden="true"></i>Enable </button>';
					//replace current row
					$("#c" + data.id + ".carriageDisable").replaceWith(dataRowEditColumn);
					$("#c" + data.id + ".carriageStatusActive").replaceWith(dataRowStatusColumn);
					//add event
					$('#c' + data.id + ' .carriageEnable').click(EnableCarriage);
				}
			}, error: function(e) {
				var dataError = '<div class="alert alert-danger alert-dismissible fade show" role="alert"> <strong>Error!</strong> Cannot disable this carriage! <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
				$('#carriageError').append(dataError)
			}
		})
	}
	//// not ajax but this is function of search carriage
	$(document).ready(function() {
		$("#carriageSearch").on("keyup", function() {
			var value = $(this).val().toLowerCase();
			$("#carriageTable tr").filter(function() {
				$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
			});
		});
	});
}
);