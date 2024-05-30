package fr.mdsow.gestionstock.service.mapper;

import fr.mdsow.gestionstock.domain.Categorie;
import fr.mdsow.gestionstock.domain.Produit;
import fr.mdsow.gestionstock.service.dto.CategorieDTO;
import fr.mdsow.gestionstock.service.dto.ProduitDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Produit} and its DTO {@link ProduitDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProduitMapper extends EntityMapper<ProduitDTO, Produit> {
    @Mapping(target = "categorie", source = "categorie", qualifiedByName = "categorieNom")
    ProduitDTO toDto(Produit s);

    @Named("categorieNom")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nom", source = "nom")
    CategorieDTO toDtoCategorieNom(Categorie categorie);
}
