package fr.mdsow.gestionstock.service.mapper;

import fr.mdsow.gestionstock.domain.Approvisionnement;
import fr.mdsow.gestionstock.domain.Fournisseur;
import fr.mdsow.gestionstock.domain.Produit;
import fr.mdsow.gestionstock.service.dto.ApprovisionnementDTO;
import fr.mdsow.gestionstock.service.dto.FournisseurDTO;
import fr.mdsow.gestionstock.service.dto.ProduitDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Approvisionnement} and its DTO {@link ApprovisionnementDTO}.
 */
@Mapper(componentModel = "spring")
public interface ApprovisionnementMapper extends EntityMapper<ApprovisionnementDTO, Approvisionnement> {
    @Mapping(target = "fournisseur", source = "fournisseur", qualifiedByName = "fournisseurNom")
    @Mapping(target = "produit", source = "produit", qualifiedByName = "produitNom")
    ApprovisionnementDTO toDto(Approvisionnement s);

    @Named("fournisseurNom")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nom", source = "nom")
    FournisseurDTO toDtoFournisseurNom(Fournisseur fournisseur);

    @Named("produitNom")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nom", source = "nom")
    ProduitDTO toDtoProduitNom(Produit produit);
}
