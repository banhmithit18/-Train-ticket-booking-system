package sopvn.Trainticketbookingsystem.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sopvn.Trainticketbookingsystem.model.station;

public interface stationRepository extends JpaRepository<station, Integer> {
	station findById(int id);
	station findByName(String name);
	List<station> findByActiveTrue();
	
}
