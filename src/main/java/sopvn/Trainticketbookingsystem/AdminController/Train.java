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
import sopvn.Trainticketbookingsystem.model.train;
import sopvn.Trainticketbookingsystem.repository.carriageRepository;
import sopvn.Trainticketbookingsystem.repository.trainRepository;
import sopvn.Trainticketbookingsystem.ulti.Mappings;
import sopvn.Trainticketbookingsystem.ulti.ViewNames;

@Controller
public class Train {
	@Autowired
	trainRepository trains;
	@Autowired
	carriageRepository carriages;

	@RequestMapping(Mappings.ADMIN_TRAIN_MANAGEMEN)
	public String Index(Model model) {
		// show train list
		List<train> trainList = trains.findAll();
		model.addAttribute("trains", trainList);
		// show carriage list
		List<train> routineTrainList = trains.findByActiveTrue();
		model.addAttribute("routineTrains",routineTrainList);
		List<carriage> carriageList = carriages.findAll();
		model.addAttribute("carriages", carriageList);
		return ViewNames.ADMIN_TRAIN_MANAGEMENT;
	}

	/// check if name or serial number already exits
	public Boolean CheckTrainNameAndSerialNumber(train t) {
		if (trains.findByName(t.getName()) != null || trains.findBySerialnumber(t.getSerialnumber()) != null) {
			return true;
		} else {
			return false;
		}
	}

	/// create
	@RequestMapping(value = Mappings.ADMIN_TRAIN_CREATE, method = RequestMethod.POST, consumes = { "application/json" })
	public @ResponseBody train CreateTrain(@RequestBody train t) throws Exception {
		if (!CheckTrainNameAndSerialNumber(t)) {
			trains.save(t);
			train trainCreated = trains.findByName(t.getName());
			return trainCreated;
		} else {
			return null;
		}
	}

	// enable with AJAX
	@RequestMapping(value = Mappings.ADMIN_TRAIN_ENABLE, method = RequestMethod.POST, consumes = { "application/json" })
	@ResponseBody
	public train EnableTrain(@RequestBody int id) {
		train t = trains.findById(id);
		t.setActive(true);
		try {
			trains.save(t);
		} catch (Exception e) {
			return null;
		}
		return t;
	}

	// disable
	@RequestMapping(value = Mappings.ADMIN_TRAIN_DISABLE, method = RequestMethod.POST, consumes = {
			"application/json" })
	@ResponseBody
	public train DisableTrain(@RequestBody int id) {
		train t = trains.findById(id);
		t.setActive(false);
		try {
			trains.save(t);
		} catch (Exception e) {
			return null;
		}

		return t;
	}

	// delete
	@RequestMapping(value = Mappings.ADMIN_TRAIN_DELETE, method = RequestMethod.POST, consumes = { "application/json" })
	@ResponseBody
	public train DeleteTrain(@RequestBody String idInString) {
		int id = Integer.parseInt(idInString);
		train trainDeleted = trains.findById(id);
		try {

			trains.deleteById(id);
		} catch (ExpressionException e) {
			return null;
		}
		return trainDeleted;
	}
}
