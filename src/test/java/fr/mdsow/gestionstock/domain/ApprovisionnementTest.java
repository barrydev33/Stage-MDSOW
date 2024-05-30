package fr.mdsow.gestionstock.domain;

import static fr.mdsow.gestionstock.domain.ApprovisionnementTestSamples.*;
import static fr.mdsow.gestionstock.domain.FournisseurTestSamples.*;
import static fr.mdsow.gestionstock.domain.ProduitTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import fr.mdsow.gestionstock.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ApprovisionnementTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Approvisionnement.class);
        Approvisionnement approvisionnement1 = getApprovisionnementSample1();
        Approvisionnement approvisionnement2 = new Approvisionnement();
        assertThat(approvisionnement1).isNotEqualTo(approvisionnement2);

        approvisionnement2.setId(approvisionnement1.getId());
        assertThat(approvisionnement1).isEqualTo(approvisionnement2);

        approvisionnement2 = getApprovisionnementSample2();
        assertThat(approvisionnement1).isNotEqualTo(approvisionnement2);
    }

    @Test
    void fournisseurTest() throws Exception {
        Approvisionnement approvisionnement = getApprovisionnementRandomSampleGenerator();
        Fournisseur fournisseurBack = getFournisseurRandomSampleGenerator();

        approvisionnement.setFournisseur(fournisseurBack);
        assertThat(approvisionnement.getFournisseur()).isEqualTo(fournisseurBack);

        approvisionnement.fournisseur(null);
        assertThat(approvisionnement.getFournisseur()).isNull();
    }

    @Test
    void produitTest() throws Exception {
        Approvisionnement approvisionnement = getApprovisionnementRandomSampleGenerator();
        Produit produitBack = getProduitRandomSampleGenerator();

        approvisionnement.setProduit(produitBack);
        assertThat(approvisionnement.getProduit()).isEqualTo(produitBack);

        approvisionnement.produit(null);
        assertThat(approvisionnement.getProduit()).isNull();
    }
}
