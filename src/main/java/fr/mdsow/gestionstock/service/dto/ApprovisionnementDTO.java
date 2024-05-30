package fr.mdsow.gestionstock.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link fr.mdsow.gestionstock.domain.Approvisionnement} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ApprovisionnementDTO implements Serializable {

    private Long id;

    @NotNull
    private Instant date;

    @NotNull
    private Long quantite;

    private FournisseurDTO fournisseur;

    private ProduitDTO produit;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Long getQuantite() {
        return quantite;
    }

    public void setQuantite(Long quantite) {
        this.quantite = quantite;
    }

    public FournisseurDTO getFournisseur() {
        return fournisseur;
    }

    public void setFournisseur(FournisseurDTO fournisseur) {
        this.fournisseur = fournisseur;
    }

    public ProduitDTO getProduit() {
        return produit;
    }

    public void setProduit(ProduitDTO produit) {
        this.produit = produit;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ApprovisionnementDTO)) {
            return false;
        }

        ApprovisionnementDTO approvisionnementDTO = (ApprovisionnementDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, approvisionnementDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ApprovisionnementDTO{" +
            "id=" + getId() +
            ", date='" + getDate() + "'" +
            ", quantite=" + getQuantite() +
            ", fournisseur=" + getFournisseur() +
            ", produit=" + getProduit() +
            "}";
    }
}
