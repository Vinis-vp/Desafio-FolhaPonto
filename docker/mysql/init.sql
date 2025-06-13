-- -----------------------------------------------------
-- Schema FolhaPonto
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `FolhaPonto` DEFAULT CHARACTER SET utf8 ;
USE `FolhaPonto` ;

-- -----------------------------------------------------
-- Table `FolhaPonto`.`tipoUsuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FolhaPonto`.`tipoUsuario` ;

CREATE TABLE IF NOT EXISTS `FolhaPonto`.`tipoUsuario` (
  `id` INT NOT NULL,
  `funcao` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `funcao_UNIQUE` (`funcao` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FolhaPonto`.`usuario`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FolhaPonto`.`usuario` ;

CREATE TABLE IF NOT EXISTS `FolhaPonto`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `matricula` VARCHAR(20) NOT NULL,
  `senha` VARCHAR(255) NOT NULL,
  `salt` VARCHAR(255) NOT NULL,
  `dataCriacao` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `tipoUsuario` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `matricula_UNIQUE` (`matricula` ASC) VISIBLE,
  INDEX `fk_usuario_tipoUsuario_idx` (`tipoUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_usuario_tipoUsuario`
    FOREIGN KEY (`tipoUsuario`)
    REFERENCES `FolhaPonto`.`tipoUsuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FolhaPonto`.`jornadaTrabalho`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FolhaPonto`.`jornadaTrabalho` ;

CREATE TABLE IF NOT EXISTS `FolhaPonto`.`jornadaTrabalho` (
  `id` INT NOT NULL,
  `entradaManha` TIME NOT NULL,
  `saidaManha` TIME NOT NULL,
  `entradaTarde` TIME NOT NULL,
  `saidaTarde` TIME NOT NULL,
  `idUsuario` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_jornadaTrabalho_usuario1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_jornadaTrabalho_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `FolhaPonto`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FolhaPonto`.`pontos`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `FolhaPonto`.`pontos` ;

CREATE TABLE IF NOT EXISTS `FolhaPonto`.`pontos` (
  `id` INT NOT NULL,
  `idUsuario` INT NOT NULL,
  `horarioReal` DATETIME NOT NULL,
  `dataRegistro` DATE NOT NULL,
  `dentroDaJanela` TINYINT NOT NULL,
  `tipoRegistro` ENUM('entrada_manha', 'saida_manha', 'entrada_tarde', 'saida_tarde') NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pontos_usuario1_idx` (`idUsuario` ASC) VISIBLE,
  CONSTRAINT `fk_pontos_usuario1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `FolhaPonto`.`usuario` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
