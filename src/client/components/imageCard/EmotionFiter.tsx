import * as React from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { EP } from "@common/interfaces";
// import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import Select, { SelectProps } from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import { Typography } from '@material-ui/core';

const styles = ({ palette, spacing }: Theme) => createStyles({
    formControl: {
        margin: spacing.unit * 3,
        width: 550
    },
    formLabel: {
        color: palette.secondary.main,
        textAlign: 'center',
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    chip: {
        margin: `-6px 2px -2px 2px`,
        height: 27
    },
    formContainer: {
        display: 'flex',
        alignItems: 'center', 
        justifyContent: 'center',
        marginTop: 20
    },
    labelHelper: {
        position: 'initial'
    },
    selectMultiple: {
        //height: 60
    }
});

const MenuProps = {
  PaperProps: {
    style: {
        maxHeight: 224,
        width: 550,
    },
  },
};

  

export interface Props extends WithStyles<typeof styles> {}

class EmotionFilter extends React.Component<Props> {
    state = {
        selectedEmotions: []
    };

    handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ selectedEmotions: event.target.value });
    }

    renderSelectValue = (selected: SelectProps["value"]) => {
        const { classes } = this.props; 
        const arr = selected as [];
        return (
            <div className={classes.chips}>
                {arr!.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                ))}
            </div>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h6" component="h6" className={classes.formLabel}>You can choose emotions to filter pictures by:</Typography>
                <div className={classes.formContainer}>
                    <FormControl className={classes.formControl}>
                        <InputLabel className={classes.labelHelper} htmlFor="select-multiple-chip">Select the emotions</InputLabel>
                        <FormGroup>
                            <Select
                                multiple
                                value={this.state.selectedEmotions}
                                onChange={this.handleChange}
                                input={<Input id="select-multiple-chip" />}
                                renderValue={this.renderSelectValue} 
                                className={classes.selectMultiple}
                                MenuProps={MenuProps}
                            >
                            {EP.PossibleEmotions.map(value => (
                                <MenuItem key={value} value={value}>
                                    {value}
                                </MenuItem>
                            ))}
                            </Select>
                        </FormGroup>
                        <FormHelperText>Choose emotions to filter them</FormHelperText>
                    </FormControl>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(EmotionFilter);
