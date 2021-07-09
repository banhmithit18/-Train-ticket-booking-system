package sopvn.Trainticketbookingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sopvn.Trainticketbookingsystem.model.carriage;

public interface carriageRepository extends JpaRepository<carriage, Integer> {
	carriage findById(int id);
	carriage findByName(String name);
	List<carriage> findByActiveTrue();
	
}
