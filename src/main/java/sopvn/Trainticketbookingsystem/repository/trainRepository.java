package sopvn.Trainticketbookingsystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import sopvn.Trainticketbookingsystem.model.train;

public interface trainRepository extends JpaRepository<train, Integer> {
	List<train> findByActiveTrue();
	train findById(int id);
	train findByName(String name);
	train findBySerialnumber(String serialnumber);
}
