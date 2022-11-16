package persona.angularback.service;
import persona.angularback.model.Person;
import java.util.List;

public interface PersonService {

    List<Person> findAll();
    Person findById(int id);
    Person save(Person person);
    void delete(int id);
}
