package sopvn.Trainticketbookingsystem.AdminController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import sopvn.Trainticketbookingsystem.model.carriage;
import sopvn.Trainticketbookingsystem.model.station;
import sopvn.Trainticketbookingsystem.repository.carriageRepository;
import sopvn.Trainticketbookingsystem.repository.stationRepository;
import sopvn.Trainticketbookingsystem.ulti.Mappings;
import sopvn.Trainticketbookingsystem.ulti.ViewNames;

@Controller
public class Station {
	@Autowired
	stationRepository stations;
	

	@RequestMapping(Mappings.ADMIN_STATION_MANAGEMENT)
	public String Index(Model model) {
		// show station list
		List<station> stationList = stations.findAll();
		model.addAttribute("stations", stationList);
		
		return ViewNames.ADMIN_STATION_MANAGEMENT;
	}

	// create with AJAX
	@RequestMapping(value = Mappings.ADMIN_STATION_CREATE, method = RequestMethod.POST, consumes = {
			"application/json" })
	public @ResponseBody station CreateStation(@RequestBody station s) throws Exception {
		if (!CheckStationName(s)) {
			stations.save(s);
			station stationCreated = stations.findByName(s.getName());
			return stationCreated;
		} else {
			return null;
		}
	}

	// check if name already created
	public Boolean CheckStationName(station s) {
		if (stations.findByName(s.getName()) != null) {
			return true;
		} else {
			return false;
		}
	}
	// enable with AJAX

	@RequestMapping(value = Mappings.ADMIN_STATION_ENABLE, method = RequestMethod.POST, consumes = {
			"application/json" })
	@ResponseBody
	public station EnableStation(@RequestBody int id) {
		station s = stations.findById(id);
		s.setActive(true);
		try {
			stations.save(s);
		} catch (Exception e) {
			return null;
		}
		return s;
	}

	// disable
	@RequestMapping(value = Mappings.ADMIN_STATION_DISABLE, method = RequestMethod.POST, consumes = {
			"application/json" })
	@ResponseBody
	public station DisableStation(@RequestBody int id) {
		station s = stations.findById(id);
		s.setActive(false);
		try {
			stations.save(s);
		} catch (Exception e) {
			return null;
		}

		return s;
	}

	// delete
	@RequestMapping(value = Mappings.ADMIN_STATION_DELETE, method = RequestMethod.POST, consumes = {
			"application/json" })
	@ResponseBody
	public station DeleteStation(@RequestBody String idInString) {
		int id = Integer.parseInt(idInString);
		station stationDeleted = stations.findById(id);
		try {

			stations.deleteById(id);
		} catch (ExpressionException e) {
			return null;
		}
		return stationDeleted;
	}

}
