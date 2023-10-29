package main

import (
	"errors"
	"example/falabellaTest/entity"
	"example/falabellaTest/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
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

func getProductBySku(sku string) (*entity.Product, error) {
	for i, p := range products {
		if p.SKU == sku {
			return &products[i], nil
		}
	}
	return nil, errors.New("product not found")
}

func productBySku(c *gin.Context) {
	sku := strings.ToUpper(c.Param("sku"))
	product, err := getProductBySku(sku)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "product not found"})
		return
	}

	c.IndentedJSON(http.StatusOK, product)
}

func updateProduct(c *gin.Context) {
	sku, ok := c.GetQuery("sku")
	var updatedProduct entity.Product

	if ok == false {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "missing sku query parameter"})
		return
	}

	if err := c.BindJSON(&updatedProduct); err != nil {
		return
	}

	if err := utils.CheckProductProperties(updatedProduct); err != nil {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}

	sku = strings.ToUpper(sku)
	product, err := getProductBySku(sku)

	if err != nil {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "product not found"})
		return
	}

	product.SKU = updatedProduct.SKU
	product.Name = updatedProduct.Name
	product.Brand = updatedProduct.Brand
	product.Size = updatedProduct.Size
	product.Price = updatedProduct.Price
	product.PrincipalImage = updatedProduct.PrincipalImage
	product.OtherImages = updatedProduct.OtherImages

	c.IndentedJSON(http.StatusOK, product)
}

func deleteProduct(c *gin.Context) {
	sku, ok := c.GetQuery("sku")
	if ok == false {
		c.IndentedJSON(http.StatusBadRequest, gin.H{"message": "missing sku query parameter"})
		return
	}
	sku = strings.ToUpper(sku)
	index := -1
	for i, p := range products {
		if p.SKU == sku {
			index = i
			break
		}
	}

	if index == -1 {
		c.IndentedJSON(http.StatusNotFound, gin.H{"message": "product not found"})
		return
	}

	products = append(products[:index], products[index+1:]...)
	c.IndentedJSON(http.StatusOK, gin.H{"message": "product deleted"})
}

func main() {
	router := gin.Default()
	router.GET("/products", getProducts)
	router.POST("/products", createProduct)
	router.GET("/products/:sku", productBySku)
	router.PATCH("/product", updateProduct)
	router.DELETE("/product", deleteProduct)
	router.Run("localhost:8080")
}
