package main

import (
	"example/falabellaTest/entity"
	"example/falabellaTest/utils"
	"net/http"

	"github.com/gin-gonic/gin"
	//"errors"
)

var products = []entity.Product{
	{
		SKU:            "FAL-8406270",
		Name:           "500 Zapatilla Urbana Mujer",
		Brand:          "NEW-BALANCE",
		Size:           func() *string { v := "37"; return &v }(),
		Price:          42990.00,
		PrincipalImage: "https://falabella.scene7.com/is/im-age/Falabella/8406270_1",
	},
	{
		SKU:            "FAL-881952283",
		Name:           "Bicicleta Bal-toro Aro 29",
		Brand:          "JEEP",
		Size:           func() *string { v := "ST"; return &v }(),
		Price:          399990.00,
		PrincipalImage: "https://falabe-lla.scene7.com/is/image/Falabe-lla/881952283_1",
		OtherImages: []string{
			"https://falabe-lla.scene7.com/is/image/Falabe-lla/881952283_2",
		},
	},
	{
		SKU:            "FAL-881898502",
		Name:           "Camisa Manga Corta Hombre",
		Brand:          "BASEMENT",
		Size:           func() *string { v := "ST"; return &v }(),
		Price:          24990.00,
		PrincipalImage: "https://falabella.scene7.com/is/im-age/Falabella/881898502_1",
	},
}

/*func getProductBySku(sku string) (*product, error) {
	for i, p := range products {
		if p.SKU == sku {
			return &products[i] , nil
		}
	}
}*/

func getProducts(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, products)
}

func createProduct(c *gin.Context) {
	var newProduct entity.Product
	if err := c.BindJSON(&newProduct); err != nil {
		return
	}
	if err := utils.CheckDuplicatedSku(newProduct.SKU, products); err != nil {
		c.IndentedJSON(http.StatusConflict, gin.H{"message": err.Error()})
		return
	}
	if err := utils.CheckProductProperties(newProduct); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	products = append(products, newProduct)
	c.IndentedJSON(http.StatusCreated, newProduct)
}

func main() {
	router := gin.Default()
	router.GET("/products", getProducts)
	router.POST("/products", createProduct)
	router.Run("localhost:8080")
}
