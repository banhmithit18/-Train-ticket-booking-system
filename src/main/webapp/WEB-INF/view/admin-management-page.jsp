<%@include file="../common/header.jspf"%>

<div class="container-fluid py-4">
	<div class="row">
		<div class="col-12">
			<div class="card mb-4">
				<ul class="nav nav-pills  mb-3" id="pills-tab" role="tablist">
					<!-- schedule -->
					<li class="nav-link" role="presentation">
						<button class="nav-link active" id="pills-schedule-tab"
							data-bs-toggle="pill" data-bs-target="#pills-schedule"
							type="button" role="tab" aria-controls="pills-schedule"
							aria-selected="true">Schedule Management</button>
					</li>
					<!-- routine -->
					<li class="nav-link" role="presentation">
						<button class="nav-link " id="pills-routine-tab"
							data-bs-toggle="pill" data-bs-target="#pills-routine"
							type="button" role="tab" aria-controls="pills-routine"
							aria-selected="false">Routine Management</button>
					</li>
					<!-- seat -->
					<li class="nav-link " role="presentation"><button
							class="nav-link " id="pills-seat-tab" data-bs-toggle="pill"
							data-bs-target="#pills-seat" role="tab"
							aria-controls="pills-seat" aria-selected="fasle">Seat
							Management</button></li>
					<!-- carriage -->
					<li class="nav-link " role="presentation"><button
							class="nav-link " id="pills-carriage-tab" data-bs-toggle="pill"
							data-bs-target="#pills-carriage" role="tab"
							aria-controls="pills-carriage" aria-selected="fasle">Carriage
							Management</button></li>
					<!-- train -->
					<li class="nav-link " role="presentation"><button
							class="nav-link " id="pills-home-tab" data-bs-toggle="pill"
							data-bs-target="#pills-home" role="tab"
							aria-controls="pills-home" aria-selected="fasle">Train
							Management</button></li>
					<!-- station -->
					<li class="nav-link" role="presentation">
						<button class="nav-link" id="pills-station-tab"
							data-bs-toggle="pill" data-bs-target="#pills-station"
							type="button" role="tab" aria-controls="pills-station"
							aria-selected="false">Station Management</button>
					</li>
					<!-- seat type -->
					<li class="nav-link" role="presentation">
						<button class="nav-link" id="pills-seattype-tab"
							data-bs-toggle="pill" data-bs-target="#pills-seattype"
							type="button" role="tab" aria-controls="pills-seattype"
							aria-selected="false">Seat Type Management</button>
					</li>


				</ul>
				<div class="tab-content" id="pills-tabContent">
					<!-- tab : schedule -->


					<div class="tab-pane fade p-3 show active" id="pills-schedule"
						role="tabpanel" aria-labelledby="pills-schedule-tab">
						<div class="row">
							<div class="col-12">
								<div class="card mb-4">
									<div class="card-header pb-0 p-3">
										<div class="row">
											<div class="col-md-6 d-flex align-items-center">
												<h6 class="mb-0">Schedule Management</h6>
											</div>
										</div>
									</div>
									<div class="card-body p-3">
										<!-- input form -->
										<form>
											<div class="row">
												<div class="card mb-4">
													<div class="card-header pb-0">
														<h6>Add Schedule</h6>
													</div>
													<div class="card-body px-0 pt-0 pb-2">
														<div class="row p-3">
															<div class=" col-6">
																<label for="scheduleRoutine" class="form-label">Routine
																</label> <select class="form-select" id="scheduleRoutine"
																	aria-label="Select station">
																	<c:forEach var="item" items="${scheduleRoutines}">
																		<option value="${item.id}">${item.name}</option>
																	</c:forEach>
																</select>
															</div>
															<div class=" col-6">
																<label for="scheduleDate" class="form-label">Date
																</label> <input type="date" class="form-control"
																	id="scheduleDate" name="date" placeholder="Date..."
																	required>
															</div>
															<div class=" col-6">
																<label for="schedulePrice" class="form-label">Price
																</label> <input type="number" class="form-control"
																	id="schedulePrice" name="price" placeholder="Price..."
																	required>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6 p-3">
												<button id="scheduleCreate"
													class="btn bg-gradient-dark mb-0" type="button">Submit</button>
											</div>
										</form>
										<!-- input form end  -->
									</div>
								</div>
							</div>
						</div>
						<div id="scheduleError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Schedule</h6>
										</div>
										<div class="col-4">
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="scheduleSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0 scroll">
										<!-- table train -->
										<table class="table align-items-center mb-0"
											id="scheduleTable">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Routine
													</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Date
													</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Price
													</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Status
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="item" items="${schedules}">
													<tr id="sc${item.id}">
														<td class="align-middle text-center"><span
															class=" text-sm font-weight-bold">${item.routine.name}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.dateDisplay()}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.price}</span>
														</td>
														<c:if test="${item.active eq true}">
															<td
																class="align-middle text-center text-sm scheduleStatusActive"
																id="sc${item.id}"><span
																class="badge badge-sm bg-gradient-success">Active</span></td>
														</c:if>
														<c:if test="${item.active eq false }">
															<td
																class="align-middle text-center text-sm scheduleStatusDisable"
																id="sc${item.id}"><span
																class="badge badge-sm bg-gradient-secondary">Postponed</span>
															</td>
														</c:if>

														<td class="align-middle">
															<div class="ms-auto">

																<c:if test="${item.active eq false}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 scheduleEnable"
																		id="sc${item.id}">
																		<i class="fas fa-pencil-alt text-success me-2"
																			aria-hidden="true"></i>Enable
																	</button>
																</c:if>
																<c:if test="${item.active eq true}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 scheduleDisable"
																		id="sc${item.id}">
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
										<!-- table end -->
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- tab : routine  management -->
					<div class="tab-pane fade p-3" id="pills-routine" role="tabpanel"
						aria-labelledby="pills-routine-tab">
						<div class="row">
							<div class="col-12">
								<div class="card mb-4">
									<div class="card-header pb-0 p-3">
										<div class="row">
											<div class="col-md-6 d-flex align-items-center">
												<h6 class="mb-0">Routine Management</h6>
											</div>
										</div>
									</div>
									<div class="card-body p-3">
										<!-- input form -->
										<form>
											<div class="row">
												<div class="card mb-4">
													<div class="card-header pb-0">
														<h6>Add Routine</h6>
													</div>
													<div class="card-body px-0 pt-0 pb-2">
														<div class="row p-3">
															<div class=" col-6">
																<label for="routineName" class="form-label">Routine
																	Name </label> <input type="text" class="form-control"
																	id="routineName">

															</div>
															<div class=" col-6">
																<label for="routineStationStart" class="form-label">Station
																	Start </label> <select class="form-select"
																	id="routineStationStart" aria-label="Select station">
																	<c:forEach var="itemStation" items="${routineStations}">
																		<option value="${itemStation.id}">${itemStation.name}</option>
																	</c:forEach>
																</select>
															</div>
															<div class=" col-6">
																<label for="routineStationEnd" class="form-label">Station
																	End </label> <select class="form-select"
																	aria-label="Select station" id="routineStationEnd">
																	<c:forEach var="itemStation" items="${routineStations}">
																		<option value="${itemStation.id}">${itemStation.name}</option>
																	</c:forEach>
																</select>
															</div>
															<div class=" col-6">
																<label for="routineDepartureTime" class="form-label">Departure
																	Time </label> <input type="time" class="form-control"
																	id="routineDepartureTime">

															</div>
															<div class=" col-6">
																<label for="routineArrivalTime" class="form-label">Arrival
																	Time </label> <input type="time" class="form-control"
																	id="routineArrivalTime">
															</div>
															<div class=" col-6">
																<label for="routineTrain" class="form-label">Train
																</label> <select class="form-select" aria-label="Select train"
																	id="routineTrain">
																	<c:forEach var="itemTrain" items="${routineTrains}">
																		<option value="${itemTrain.id}">${itemTrain.serialnumber}</option>
																	</c:forEach>
																</select>
															</div>
															<div class=" col-6">
																<label for="routineDistance" class="form-label">Distance
																</label> <input type="text" class="form-control"
																	id="routineDistance" placeholder="Distance..">
															</div>
															<div class=" col-6">
																<label for="routineActive" class="form-label">Active
																</label>
																<div class="form-check form-switch ps-0">

																	<input class="form-check-input ms-auto" type="checkbox"
																		id="routineActive" checked>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6 p-3">
												<button id="routineCreate" class="btn bg-gradient-dark mb-0"
													type="button">Submit</button>
											</div>
										</form>
										<!-- input form end  -->
									</div>
								</div>
							</div>
						</div>
						<!-- place to show response -->
						<div id="routineError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Routine</h6>
										</div>
										<div class="col-4">
											<!-- search form -->
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="routineSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0 scroll">
										<!-- table  -->
										<table class="table align-items-center mb-0" id="routineTable">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Name
													</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Train
													</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Station
														Start</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Station
														End</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Departure
														Time</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Arrival
														Time</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Distance
													</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Status
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="item" items="${routines}">
													<tr id="r${item.id}">
														<td class="align-middle text-center"><span
															class=" text-sm font-weight-bold">${item.name}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.train.serialnumber}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.station_start.name}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.station_end.name}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.departuretimeDisplay()}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.arrivaltimeDisplay()}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.distance}</span>
														</td>
														<c:if test="${item.active eq true}">
															<td
																class="align-middle text-center text-sm routineStatusActive"
																id="r${item.id}"><span
																class="badge badge-sm bg-gradient-success">Active</span></td>
														</c:if>
														<c:if test="${item.active eq false }">
															<td
																class="align-middle text-center text-sm routineStatusDisable"
																id="r${item.id}"><span
																class="badge badge-sm bg-gradient-secondary">Maintenance</span>
															</td>
														</c:if>
														<td class="align-middle">
															<div class="ms-auto">
																<button
																	class="btn btn-link text-danger text-gradient px-3 mb-0 routineDelete"
																	id="r${item.id}">
																	<i class="far fa-trash-alt me-2"></i>Delete
																</button>
																<c:if test="${item.active eq false}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 routineEnable"
																		id="r${item.id}">
																		<i class="fas fa-pencil-alt text-success me-2"
																			aria-hidden="true"></i>Enable
																	</button>
																</c:if>
																<c:if test="${item.active eq true}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 routineDisable"
																		id="r${item.id}">
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
										<!-- table end -->
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- tab seat -->
					<div class="tab-pane fade p-3" id="pills-seat" role="tabpanel"
						aria-labelledby="pills-seat-tab">

						<div id="seatError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Seat</h6>
										</div>
										<div class="col-4">
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="seatSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0 scroll">
										<!-- table seat -->
										<table class="table align-items-center mb-0" id="seatTable">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Name
													</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Carriage
													</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Seat
														Type</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Price
													</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Status
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="item" items="${seats}">
													<tr id="se${item.id}">
														<td class="align-middle text-center"><span
															class=" text-sm font-weight-bold">${item.name}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.carriage.name}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.seat.name}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.price}</span>
														</td>
														<c:if test="${item.active eq true}">
															<td
																class="align-middle text-center text-sm seatStatusActive"
																id="se${item.id}"><span
																class="badge badge-sm bg-gradient-success">Active</span></td>
														</c:if>
														<c:if test="${item.active eq false }">
															<td
																class="align-middle text-center text-sm seatStatusDisable"
																id="se${item.id}"><span
																class="badge badge-sm bg-gradient-secondary">Maintenance</span>
															</td>
														</c:if>
														<td class="align-middle">
															<div class="ms-auto">
																<button
																	class="btn btn-link text-dark px-3 mb-0 seatEditForm"
																	id="se${item.id}" data-bs-toggle="modal"
																	data-bs-target="#staticBackdrop">
																	<i class="fas fa-pencil-alt text-dark me-2"
																		aria-hidden="true"></i>Edit
																</button>
																<c:if test="${item.active eq false}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 seatEnable"
																		id="se${item.id}">
																		<i class="fas fa-pencil-alt text-success me-2"
																			aria-hidden="true"></i>Enable
																	</button>
																</c:if>
																<c:if test="${item.active eq true}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 seatDisable"
																		id="se${item.id}">
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
										<!-- table end -->
									</div>
								</div>
							</div>
						</div>
					</div>


					<!-- tab carriage management -->
					<div class="tab-pane fade p-3" id="pills-carriage" role="tabpanel"
						aria-labelledby="pills-carriage-tab">
						<div class="row">
							<div class="col-12">
								<div class="card mb-4">
									<div class="card-header pb-0 p-3">
										<div class="row">
											<div class="col-md-6 d-flex align-items-center">
												<h6 class="mb-0">Carriage Management</h6>
											</div>
										</div>
									</div>
									<div class="card-body p-3">
										<!-- input form -->
										<form>
											<div class="row">
												<div class="card mb-4">
													<div class="card-header pb-0">
														<h6>Add Carriage</h6>
													</div>
													<div class="card-body px-0 pt-0 pb-2">
														<div class="row p-3">
															<div class=" col-6">
																<label for="carriageName" class="form-label">Carriage
																	name </label> <input type="text" class="form-control"
																	id="carriageName" name="name"
																	placeholder="Carriage Name.." required>
															</div>
															<div class=" col-6">
																<label for="carriageTrain" class="form-label">Train
																</label> <select class="form-select" aria-label="Select train"
																	id="carriageTrain">
																	<c:forEach var="item" items="${routineTrains}">
																		<option value="${item.id}">${item.serialnumber}</option>
																	</c:forEach>
																</select>
															</div>
															<div class=" col-6">
																<label for="carriageSeatAmount" class="form-label">Seat
																	Amount </label> <input type="number" class="form-control"
																	id="carriageSeatAmount" name="carriageSeatAmount"
																	placeholder="Seat amount.." required>
															</div>
															<div class=" col-2">
																<label for="carriageActive" class="form-label">Active
																</label>
																<div class="form-check form-switch ps-0">
																	<input class="form-check-input ms-auto" type="checkbox"
																		id="carriageActive" name="active" checked>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6 p-3">
												<button id="carriageCreate"
													class="btn bg-gradient-dark mb-0" type="button">Submit</button>
											</div>
										</form>
										<!-- input form end  -->
									</div>
								</div>
							</div>
						</div>
						<div id="carriageError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Carriage</h6>
										</div>
										<div class="col-4">
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="carriageSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0 scroll">
										<!-- table train -->
										<table class="table align-items-center mb-0"
											id="carriageTable">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Name
													</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Train
													</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Seat
														Amount</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Status
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="item" items="${carriages}">
													<tr id="c${item.id}">
														<td class="align-middle text-center"><span
															class=" text-sm font-weight-bold">${item.name}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.train.name}</span>
														</td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.seatamount}</span>
														</td>
														<c:if test="${item.active eq true}">
															<td
																class="align-middle text-center text-sm carriageStatusActive"
																id="c${item.id}"><span
																class="badge badge-sm bg-gradient-success">Active</span></td>
														</c:if>
														<c:if test="${item.active eq false }">
															<td
																class="align-middle text-center text-sm carriageStatusDisable"
																id="c${item.id}"><span
																class="badge badge-sm bg-gradient-secondary">Maintenance</span>
															</td>
														</c:if>
														<td class="align-middle">
															<div class="ms-auto">
																<button
																	class="btn btn-link text-danger text-gradient px-3 mb-0 carriageDelete"
																	id="c${item.id}">
																	<i class="far fa-trash-alt me-2"></i>Delete
																</button>
																<c:if test="${item.active eq false}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 carriageEnable"
																		id="c${item.id}">
																		<i class="fas fa-pencil-alt text-success me-2"
																			aria-hidden="true"></i>Enable
																	</button>
																</c:if>
																<c:if test="${item.active eq true}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 carriageDisable"
																		id="t${item.id}">
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
										<!-- table end -->
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- tab train management -->
					<div class="tab-pane fade p-3" id="pills-home" role="tabpanel"
						aria-labelledby="pills-home-tab">
						<div class="row">
							<div class="col-12">
								<div class="card mb-4">
									<div class="card-header pb-0 p-3">
										<div class="row">
											<div class="col-md-6 d-flex align-items-center">
												<h6 class="mb-0">Train Management</h6>
											</div>
										</div>
									</div>
									<div class="card-body p-3">
										<!-- input form -->
										<form>
											<div class="row">
												<div class="card mb-4">
													<div class="card-header pb-0">
														<h6>Add Train</h6>
													</div>
													<div class="card-body px-0 pt-0 pb-2">
														<div class="row p-3">
															<div class=" col-6">
																<label for="trainName" class="form-label">Train
																	name </label> <input type="text" class="form-control"
																	id="trainName" name="name" placeholder="Train name.."
																	required>
															</div>
															<div class=" col-6">
																<label for="trainSerialNumber" class="form-label">Train
																	name </label> <input type="text" class="form-control"
																	id="trainSerialNumber" name="serialnumber"
																	placeholder="Serial Number.." required>
															</div>
															<div class=" col-2">
																<label for="trainActive" class="form-label">Active
																</label>
																<div class="form-check form-switch ps-0">
																	<input class="form-check-input ms-auto" type="checkbox"
																		id="trainActive" name="active">
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6 p-3">
												<button id="trainCreate" class="btn bg-gradient-dark mb-0"
													type="button">Submit</button>
											</div>
										</form>
										<!-- input form end  -->
									</div>
								</div>
							</div>
						</div>
						<div id="trainError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Train</h6>
										</div>
										<div class="col-4">
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="trainSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0 scroll">
										<!-- table train -->
										<table class="table align-items-center mb-0" id="trainTable">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Train
														name</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Train
														serial number</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Status
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="item" items="${trains}">
													<tr id="t${item.id}">
														<td class="align-middle text-center"><span
															class=" text-sm font-weight-bold">${item.name}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.serialnumber}</span>
														</td>
														<c:if test="${item.active eq true}">
															<td
																class="align-middle text-center text-sm trainStatusActive"
																id="t${item.id}"><span
																class="badge badge-sm bg-gradient-success">Active</span></td>
														</c:if>
														<c:if test="${item.active eq false }">
															<td
																class="align-middle text-center text-sm trainStatusDisable"
																id="t${item.id}"><span
																class="badge badge-sm bg-gradient-secondary">Maintenance</span>
															</td>
														</c:if>
														<td class="align-middle">
															<div class="ms-auto">
																<button
																	class="btn btn-link text-danger text-gradient px-3 mb-0 trainDelete"
																	id="t${item.id}">
																	<i class="far fa-trash-alt me-2"></i>Delete
																</button>
																<c:if test="${item.active eq false}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 trainEnable"
																		id="t${item.id}">
																		<i class="fas fa-pencil-alt text-success me-2"
																			aria-hidden="true"></i>Enable
																	</button>
																</c:if>
																<c:if test="${item.active eq true}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 trainDisable"
																		id="t${item.id}">
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
										<!-- table end -->
									</div>
								</div>
							</div>
						</div>
					</div>

					<!-- tab  station management -->
					<div class="tab-pane fade p-3" id="pills-station" role="tabpanel"
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
					<!-- tab  seat type management -->
					<div class="tab-pane fade  p-3" id="pills-seattype" role="tabpanel"
						aria-labelledby="pills-seattype-tab">
						<div class="row">
							<div class="col-12">
								<div class="card mb-4">
									<div class="card-header pb-0 p-3">
										<div class="row">
											<div class="col-md-6 d-flex align-items-center">
												<h6 class="mb-0">Seat Type Management</h6>
											</div>
										</div>
									</div>
									<div class="card-body p-3">
										<!-- input form -->
										<form>
											<div class="row">
												<div class="card mb-4">
													<div class="card-header pb-0">
														<h6>Add Seat Type</h6>
													</div>
													<div class="card-body px-0 pt-0 pb-2">
														<div class="row p-3">
															<div class=" col-6">
																<label for="seattypeName" class="form-label">Seat
																	Type name </label> <input type="text" class="form-control"
																	id="seattypeName" name="name"
																	placeholder="Seat Type name.." required>
															</div>
															<div class=" col-6">
																<label for="seattypeDescription" class="form-label">Description
																</label> <input class="form-control" id="seattypeDescription"
																	name="description" placeholder="Description.." required>
															</div>
															<div class=" col-2">
																<label for="seattypeActive" class="form-label">Active
																</label>
																<div class="form-check form-switch ps-0">
																	<input class="form-check-input ms-auto" type="checkbox"
																		id="seattypeActive" name="active">
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="col-md-6 p-3">
												<button id="seattypeCreate"
													class="btn bg-gradient-dark mb-0" type="button">Submit</button>
											</div>
										</form>
										<!-- input form end  -->
									</div>
								</div>
							</div>
						</div>
						<div id="seattypeError"></div>
						<div class="row p-3">
							<div class="card card-border mb-4">
								<div class="card-header pb-0">
									<div class="row">
										<div class="col-8">
											<h6>Seat Type</h6>
										</div>
										<div class="col-4">
											<div class="input-group">
												<span class="input-group-text text-body"><i
													class="fas fa-search" aria-hidden="true"></i></span> <input
													type="text" class="form-control" id="seattypeSearch"
													placeholder="Search here...">
											</div>
										</div>
									</div>
								</div>
								<div class="card-body px-0 pt-0 pb-2">
									<div class="table-responsive p-0 scroll">
										<!-- table train -->
										<table class="table align-items-center mb-0 scroll"
											id="seattypeTable">
											<thead>
												<tr>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Seat
														type name</th>
													<th
														class=" text-center text-uppercase text-secondary text-xxs font-weight-bolder  ps-2">Description
													</th>
													<th
														class="text-center text-uppercase text-secondary text-xxs font-weight-bolder ">Status
													</th>
													<th class="text-secondary opacity-7"></th>
												</tr>
											</thead>
											<tbody>
												<c:forEach var="item" items="${seattypes}">
													<tr id="st${item.id}">
														<td class="align-middle text-center"><span
															class=" text-sm font-weight-bold">${item.name}</span></td>
														<td class="align-middle text-center"><span
															class="text-secondary text-xs font-weight-bold">${item.description}</span>
														</td>
														<c:if test="${item.active eq true}">
															<td
																class="align-middle text-center text-sm seattypeStatusActive"
																id="st${item.id}"><span
																class="badge badge-sm bg-gradient-success">Active</span></td>
														</c:if>
														<c:if test="${item.active eq false }">
															<td
																class="align-middle text-center text-sm seattypeStatusDisable"
																id="st${item.id}"><span
																class="badge badge-sm bg-gradient-secondary">Inactive</span>
															</td>
														</c:if>
														<td class="align-middle">
															<div class="ms-auto">
																<button
																	class="btn btn-link text-danger text-gradient px-3 mb-0 seattypeDelete"
																	id="st${item.id}">
																	<i class="far fa-trash-alt me-2"></i>Delete
																</button>
																<c:if test="${item.active eq false}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 seattypeEnable"
																		id="st${item.id}">
																		<i class="fas fa-pencil-alt text-success me-2"
																			aria-hidden="true"></i>Enable
																	</button>
																</c:if>
																<c:if test="${item.active eq true}">
																	<button
																		class="btn btn-link text-dark px-3 mb-0 seattypeDisable"
																		id="st${item.id}">
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

				</div>
			</div>
		</div>
	</div>
</div>


<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static"
	data-bs-keyboard="false" tabindex="-1"
	aria-labelledby="staticBackdropLabel" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title" id="staticBackdropLabel">Edit Passenger</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal"
					aria-label="Close"></button>
			</div>
			<div class="modal-body">

				<form>
					<div class="row">
						<div class="card mb-4">

							<div class="card-body px-0 pt-0 pb-2">
								<div class="row p-3">
									<div class=" col-6">
										<label for="seatName" class="form-label">Seat
											name </label> <input type="text" class="form-control"
											id="seatNameEdit" name="name" placeholder="Name.." required
											disabled>
									</div>
									<div class=" col-6">
										<label for="seatCarriage" class="form-label">Carriage
											</label> <input type="text" class="form-control"
											id="seatCarriageEdit" name="name" placeholder="Name.." required
											disabled>
									</div>
								</div>
								<div class="row p-3">
									<div class=" col-6">
										<label for="seatSeatType" class="form-label">Seat Type </label> <select
											class="form-select" aria-label="Select seat type"
											id="seatSeatTypeEdit">
											<c:forEach var="item" items="${seatSeatTypes}">
												<option value="${item.id}">${item.name}</option>
											</c:forEach>
										</select>
									</div>
									<div class=" col-6">
										<label for="seatPrice" class="form-label">Price
											 </label> <input type="number" class="form-control"
											id="seatPriceEdit" name="price"
											placeholder="Price">
									</div>
								</div>
							</div>
						</div>
					</div>
				</form>

			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary"
					data-bs-dismiss="modal">Close</button>
				<button id="seatEdit" type="button" class="btn btn-primary">Save</button>
			</div>
		</div>
	</div>
</div>


<%@include file="../common/footer.jspf"%>