package fr.mdsow.gestionstock.domain;

import static fr.mdsow.gestionstock.domain.CategorieTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import fr.mdsow.gestionstock.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CategorieTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Categorie.class);
        Categorie categorie1 = getCategorieSample1();
        Categorie categorie2 = new Categorie();
        assertThat(categorie1).isNotEqualTo(categorie2);

        categorie2.setId(categorie1.getId());
        assertThat(categorie1).isEqualTo(categorie2);

        categorie2 = getCategorieSample2();
        assertThat(categorie1).isNotEqualTo(categorie2);
    }
}
