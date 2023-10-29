package entity

type Product struct {
	SKU            string   `json:"sku"`
	Name           string   `json:"name"`
	Brand          string   `json:"brand"`
	Size           *string  `json:"size"`
	Price          float32  `json:"price"`
	PrincipalImage string   `json:"principalImage"`
	OtherImages    []string `json:"otherImages"`
}
