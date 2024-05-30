package fr.mdsow.gestionstock.repository;

import fr.mdsow.gestionstock.domain.Approvisionnement;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Approvisionnement entity.
 */
@Repository
public interface ApprovisionnementRepository extends JpaRepository<Approvisionnement, Long> {
    default Optional<Approvisionnement> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Approvisionnement> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Approvisionnement> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select approvisionnement from Approvisionnement approvisionnement left join fetch approvisionnement.fournisseur left join fetch approvisionnement.produit",
        countQuery = "select count(approvisionnement) from Approvisionnement approvisionnement"
    )
    Page<Approvisionnement> findAllWithToOneRelationships(Pageable pageable);

    @Query(
        "select approvisionnement from Approvisionnement approvisionnement left join fetch approvisionnement.fournisseur left join fetch approvisionnement.produit"
    )
    List<Approvisionnement> findAllWithToOneRelationships();

    @Query(
        "select approvisionnement from Approvisionnement approvisionnement left join fetch approvisionnement.fournisseur left join fetch approvisionnement.produit where approvisionnement.id =:id"
    )
    Optional<Approvisionnement> findOneWithToOneRelationships(@Param("id") Long id);
}
