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
	router.StaticFS("/static", http.Dir("./frontend/dist/static"))
	router.LoadHTMLFiles("./frontend/dist/index.html")

	router.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", nil)
	})

	router.Run(config.RunAt)
}
