package fr.mdsow.gestionstock.domain;

import static org.assertj.core.api.Assertions.assertThat;

public class ApprovisionnementAsserts {

    /**
     * Asserts that the entity has all properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertApprovisionnementAllPropertiesEquals(Approvisionnement expected, Approvisionnement actual) {
        assertApprovisionnementAutoGeneratedPropertiesEquals(expected, actual);
        assertApprovisionnementAllUpdatablePropertiesEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all updatable properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertApprovisionnementAllUpdatablePropertiesEquals(Approvisionnement expected, Approvisionnement actual) {
        assertApprovisionnementUpdatableFieldsEquals(expected, actual);
        assertApprovisionnementUpdatableRelationshipsEquals(expected, actual);
    }

    /**
     * Asserts that the entity has all the auto generated properties (fields/relationships) set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertApprovisionnementAutoGeneratedPropertiesEquals(Approvisionnement expected, Approvisionnement actual) {
        assertThat(expected)
            .as("Verify Approvisionnement auto generated properties")
            .satisfies(e -> assertThat(e.getId()).as("check id").isEqualTo(actual.getId()));
    }

    /**
     * Asserts that the entity has all the updatable fields set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertApprovisionnementUpdatableFieldsEquals(Approvisionnement expected, Approvisionnement actual) {
        assertThat(expected)
            .as("Verify Approvisionnement relevant properties")
            .satisfies(e -> assertThat(e.getDate()).as("check date").isEqualTo(actual.getDate()))
            .satisfies(e -> assertThat(e.getQuantite()).as("check quantite").isEqualTo(actual.getQuantite()));
    }

    /**
     * Asserts that the entity has all the updatable relationships set.
     *
     * @param expected the expected entity
     * @param actual the actual entity
     */
    public static void assertApprovisionnementUpdatableRelationshipsEquals(Approvisionnement expected, Approvisionnement actual) {
        assertThat(expected)
            .as("Verify Approvisionnement relationships")
            .satisfies(e -> assertThat(e.getFournisseur()).as("check fournisseur").isEqualTo(actual.getFournisseur()))
            .satisfies(e -> assertThat(e.getProduit()).as("check produit").isEqualTo(actual.getProduit()));
    }
}