package main

import (
	"fmt"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
)


func main() {

	// parse config.yaml
	config := GetConfig()
	if len(os.Args) != 2 {
		fmt.Fprintln(os.Stderr, "error parameters num. Usage: ./yunche config.yaml")
		os.Exit(1)
	}
	config.parse(os.Args[1])

	router := gin.Default()
	router.Delims("{[{", "}]}")
	router.StaticFS("/assets", http.Dir("./frontend/assets"))
	router.LoadHTMLFiles("./frontend/index.tmpl")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.tmpl", nil)
	})

	router.Run(config.RunAt)
}
