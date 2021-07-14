<%@include file="../common/header.jspf"%>

<div class="container-fluid py-4">
	<div class="row">
		<div class="col-12">
			<div class="card mb-4">
				<ul class="nav nav-pills  mb-3" id="pills-tab" role="tablist">
	
					<!-- station -->
					<li class="nav-link" role="presentation">
						<button class="nav-link" id="pills-station-tab"
							data-bs-toggle="pill" data-bs-target="#pills-station"
							type="button" role="tab" aria-controls="pills-station"
							aria-selected="false">Station Management</button>
					</li>



				</ul>
				<div class="tab-content" id="pills-tabContent">
				

					

					<!-- tab  station management -->
					<div class="tab-pane fade p-3 show active" id="pills-station" role="tabpanel"
						aria-labelledby="pills-station-tab">
						<div class="row">
							<div class="col-12">
								<div class="card mb-4">
									<div class="card-header pb-0 p-3">
										<div class="row">
											<div class="col-md-6 d-flex align-items-center">
												<h6 class="mb-0">Station Management</h6>
											</div>
										</div>
									</div>
									<form id="stationForm">
										<div class="card-body p-3">
											<div class="row">
												<div class="col-md-6">
													<div class="card mb-4">
														<div class="card-header pb-0">
															<h6>Add Station</h6>
														</div>
														<div class="card-body px-0 pt-0 pb-2">
															<div class="row p-3">
																<div class=" col-12">
																	<label for="stationName" class="form-label">Station
																		name </label> <input type="text" class="form-control"
																		id="stationName" name="name"
																		placeholder="Station name.." required>
																</div>
																<div class=" col-2">
																	<label for="stationActive" class="form-label">Active
																	</label>
																	<div class="form-check form-switch ps-0">

																		<input class="form-check-input ms-auto"
																			type="checkbox" id="stationActive">
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6 p-3">
												<button id="stationCreate" type="button"
													class="btn bg-gradient-dark mb-0">Submit</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
						<div id="stationError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Station</h6>
										</div>
										<div class="col-4">
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="stationSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0 scroll">
										<table id="stationTable" class="table align-items-center mb-0">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Station
														name</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Status
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="itemStation" items="${stations}">
													<tr class="stationRow" id='${itemStation.id}'>
														<td class="align-middle text-center"><span
															class=" text-sm font-weight-bold">${itemStation.name}</span></td>
														<c:if test="${itemStation.active eq true}">
															<td
																class="align-middle text-center text-sm stationStatusActive"
																id="${itemStation.id}"><span
																class="badge badge-sm bg-gradient-success">Active</span></td>
														</c:if>

														<c:if test="${itemStation.active eq false }">
															<td
																class="align-middle text-center text-sm stationStatusDisable"
																id="${itemStation.id}"><span
																class="badge badge-sm bg-gradient-secondary">Maintenance</span></td>
														</c:if>
														<td class="align-middle">
															<div class="ms-auto">
																<button
																	class="btn btn-link text-danger text-gradient px-3 mb-0 stationDelete"
																	id="${itemStation.id}">
																	<i class="far fa-trash-alt me-2"></i>Delete
																</button>
																<c:if test="${itemStation.active eq false}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 stationEnable"
																		id="${itemStation.id}">
																		<i class="fas fa-pencil-alt text-success me-2 "
																			aria-hidden="true"></i>Enable
																	</button>
																</c:if>
																<c:if test="${itemStation.active eq true}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 stationDisable"
																		id="${itemStation.id}">
																		<i class="fas fa-pencil-alt text-danger me-2"
																			aria-hidden="true"></i>Disable
																	</button>
																</c:if>
															</div>
														</td>
													</tr>
												</c:forEach>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				




<%@include file="../common/footer.jspf"%>