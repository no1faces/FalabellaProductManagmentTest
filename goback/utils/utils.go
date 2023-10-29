package utils

import (
	"errors"
	"example/falabellaTest/entity"
	"regexp"
	"strconv"
	"strings"
)

func CheckDuplicatedSku(sku string, products []entity.Product) error {
	for _, p := range products {
		if p.SKU == sku {
			return errors.New("duplicated sku")
		}
	}
	return nil
}

func CheckProductProperties(product entity.Product) error {
	//SKU Validation
	if product.SKU == "" {
		return errors.New("empty product sku")
	} else {
		skuSlice := strings.Split(product.SKU, "-")
		if len(skuSlice) == 1 || len(skuSlice) > 2 {
			return errors.New("bad product sku")
		} else if skuSlice[0] != "FAL" {
			return errors.New("bad product sku")
		} else if skuNumber, err := strconv.Atoi(skuSlice[1]); err == nil {
			if skuNumber < 1000000 || skuNumber > 99999999 {
				return errors.New("bad product sku")
			}
		} else {
			return errors.New("bad product sku")
		}
	}

	//Name Validation
	if product.Name == "" {
		return errors.New("empty product name")
	} else if len(product.Name) < 3 || len(product.Name) > 50 {
		return errors.New("bad product name")
	}

	//Brand Validation
	if product.Brand == "" {
		return errors.New("empty product brand")
	} else if len(product.Brand) < 3 || len(product.Brand) > 50 {
		return errors.New("bad product brand")
	}

	//Size Validation
	if product.Size != nil && *product.Size == "" {
		return errors.New("empty product size")
	}

	//Price Validation
	if product.Price < 1.00 || product.Price > 99999999.00 {
		return errors.New("price out of range")
	}

	//PrincipalImage Validation
	regex := `^(http|https)://[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}(/.*)?$`
	if product.PrincipalImage == "" {
		return errors.New("empty product principalImage")
	} else {
		match, err := regexp.MatchString(regex, product.PrincipalImage)
		if err != nil || !match {
			return errors.New("bad URL at product principalImage")
		}
	}

	//OtherImages Validation
	if len(product.OtherImages) > 0 {
		for _, image := range product.OtherImages {
			match, err := regexp.MatchString(regex, image)
			if err != nil || !match {
				return errors.New("bad URL at product otherImages")
			}
		}
	}
	return nil
}
