package handlers

import (
	"api/db"
	"encoding/json"
	"net/http"
	"os"
)

type Meal struct {
	Id          string  `json:"id"`
	Name        string  `json:"name"`
	Description string  `json:"description"`
	Price       float32 `json:"price"`
}

func enableCors(w *http.ResponseWriter) {
	var corsOrigin string = os.Getenv("cors")
	// ! Env Var
	(*w).Header().Set("Access-Control-Allow-Origin", corsOrigin)
	(*w).Header().Set("Access-Control-Allow-Methods", "GET, POST")
	(*w).Header().Set("Access-Control-Allow-Headers", "Content-Type, Origin")
}

// ? Maybe add optional search parameters in the future
func GetMealsHandler(w http.ResponseWriter, r *http.Request) {
	qResp, err := db.QueryMeals()

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal Server Error"))
	}

	var data []Meal
	err = json.Unmarshal([]byte(qResp), &data)

	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		w.Write([]byte("Internal Server Error"))
	}
	w.Header().Set("Content-Type", "application/json")
	enableCors(&w)
	json.NewEncoder(w).Encode(data)
}

// TODO add method to add a meal using a worker
