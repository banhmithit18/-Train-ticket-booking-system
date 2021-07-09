package sopvn.Trainticketbookingsystem.AdminController;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.expression.ExpressionException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import sopvn.Trainticketbookingsystem.model.carriage;
import sopvn.Trainticketbookingsystem.model.carriageView;
import sopvn.Trainticketbookingsystem.repository.carriageRepository;
import sopvn.Trainticketbookingsystem.repository.trainRepository;
import sopvn.Trainticketbookingsystem.ulti.Mappings;

@Controller
public class Carriage {
@Autowired carriageRepository carriages;
@Autowired trainRepository trains;

		///check if name or serial number already exits
		public Boolean CheckCarriageName(carriage c) {
			if (carriages.findByName(c.getName()) != null) {
				return true;
			} else {
				return false;
			}
		}
	    ///create
		@RequestMapping(value = Mappings.ADMIN_CARRIAGE_CREATE, method = RequestMethod.POST, consumes = {"application/json" })
		public @ResponseBody carriageView CreateCarriage(@RequestBody carriage c) throws Exception {
			if (!CheckCarriageName(c)) {
				c.setTrain(trains.findById(c.getTrainid()));
				try {
					carriage carrigaCreated = carriages.save(c);
					carriageView carriageReturn = new carriageView();
					carriageReturn.setId(carrigaCreated.getId());
					carriageReturn.setName(carrigaCreated.getName());
					carriageReturn.setTrain(carrigaCreated.getTrain().getName());
					carriageReturn.setSeat(carrigaCreated.getSeatamount());
					carriageReturn.setActive(carrigaCreated.getActive());
					return carriageReturn;
				} catch (Exception e) {
					return null;
				}
			
			} else {
				return null;
			}
		}

		// enable with AJAX
		@RequestMapping(value = Mappings.ADMIN_CARRIAGE_ENABLE, method = RequestMethod.POST, consumes = {"application/json"})
		@ResponseBody
		public carriage EnableCarriage (@RequestBody int id) {
			carriage t = carriages.findById(id);
			t.setActive(true);
			try {
				carriages.save(t);
			} catch (Exception e) {
				return null;
			}
			return t;
		}

		// disable
		@RequestMapping(value = Mappings.ADMIN_CARRIAGE_DISABLE, method = RequestMethod.POST, consumes = {"application/json"})
		@ResponseBody
		public carriage DisableCarriage(@RequestBody int id) {
			carriage t = carriages.findById(id);
			t.setActive(false);
			try {
				carriages.save(t);
			} catch (Exception e) {
				return null;
			}

			return t;
		}

		// delete
		@RequestMapping(value = Mappings.ADMIN_CARRIAGE_DELETE, method = RequestMethod.POST, consumes = {"application/json"})
		@ResponseBody
		public carriage DeleteCarriage(@RequestBody String idInString) {
			int id = Integer.parseInt(idInString);
			carriage carriageDeleted = carriages.findById(id);
			try {
				
				carriages.deleteById(id);
			} catch (ExpressionException e) {
				return null;
			}
			return carriageDeleted;
		}
	}
