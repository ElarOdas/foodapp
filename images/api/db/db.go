package db

import (
	"database/sql"
	"fmt"
	"os"

	_ "github.com/lib/pq"
	"github.com/spf13/viper"
)

type dBConfig struct {
	DBPassword string `mapstructure:"api_pw"`
	DBName     string `mapstructure:"webapp_dbname"`
	DBUser     string `mapstructure:"api_name"`
}

// ! envvar
const (
	host = "db"
	port = 5432
)

func LoadConfig() (config dBConfig, err error) {
	viper.AddConfigPath("/run/secrets/")
	viper.SetConfigName(os.Getenv("db"))
	viper.SetConfigType("env")
	viper.AutomaticEnv()
	err = viper.ReadInConfig()
	if err != nil {
		return
	}
	err = viper.Unmarshal(&config)
	return
}

func connectToDB() (db *sql.DB, err error) {
	config, err := LoadConfig()
	if err != nil {
		return nil, err
	}
	// Connect to the PostgreSQL server
	psqlconn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable", host, port, config.DBUser, config.DBPassword, config.DBName)
	db, err = sql.Open("postgres", psqlconn)
	if err != nil {
		return nil, err
	}

	// Verify that the connection is working
	err = db.Ping()
	if err != nil {
		return nil, err
	}
	return db, nil
}

// * Query Functions

func QueryMeals() (resp string, err error) {

	db, err := connectToDB()
	if err != nil {
		return "", err
	}
	defer db.Close()

	queryString := `SELECT mealsAsJSON();`
	rows, err := db.Query(queryString)
	if err != nil {
		return "", err
	}
	defer rows.Close()
	for rows.Next() {
		err = rows.Scan(&resp)
		if err != nil {
			return "", err
		}
	}
	return resp, nil
}
