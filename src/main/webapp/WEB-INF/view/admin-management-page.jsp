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
																	id="routineDepartureTime" required>

															</div>
															<div class=" col-6">
																<label for="routineArrivalTime" class="form-label">Arrival
																	Time </label> <input type="time" class="form-control"
																	id="routineArrivalTime" required>
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
																	id="routineDistance" placeholder="Distance.." required>
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
				</div>
			</div>
		</div>
	</div>
</div>



<%@include file="../common/footer.jspf"%>