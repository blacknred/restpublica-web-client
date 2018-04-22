import React from 'react';

import { Toolbar } from 'material-ui/Toolbar';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/Menu/MenuItem';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import ContentFilterListIcon from '@material-ui/icons/FilterList';

const styles = {
    toolbar: {
        width: '100%', zIndex: '2', background: 'rgb(238, 238, 238)',
        position: 'fixed', justifyContent: 'center', left: '0px',
        transition: 'all 250ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
        alignItems: 'center'
    },
    filtersGroup: { display: 'flex', flexDirection: 'row', marginRight: '3em' },
    filter: { width: 'auto', marginLeft: '1.5em' }
}

const PostListOptions = ({ drawer, isOptionsOpen, handleFilterChange, filter,
    layout, handleLayoutChange, runEffect, handleRunEffectChange }) => {
    return (
        <Toolbar style={Object.assign({}, styles.toolbar,
            { paddingLeft: drawer ? '235px' : '0px' },
            { top: isOptionsOpen ? '56px' : '0px' })}>
            <ContentFilterListIcon />
            <RadioButtonGroup
                style={styles.filtersGroup}
                name="filter"
                defaultSelected={filter}
                onChange={(e, val) => handleFilterChange(val)} >
                <RadioButton
                    style={styles.filter}
                    value="none"
                    label="All"
                />
                <RadioButton
                    style={styles.filter}
                    value="trending"
                    label="Trending"
                />
                <RadioButton
                    style={styles.filter}
                    value="text"
                    label="Text"
                />
                <RadioButton
                    style={styles.filter}
                    value="image"
                    label="Images"
                />
                <RadioButton
                    style={styles.filter}
                    value="gif"
                    label="Gifs"
                />
                <RadioButton
                    style={styles.filter}
                    value="video"
                    label="Videos"
                />
                <RadioButton
                    style={styles.filter}
                    value="music"
                    label="Music"
                />
            </RadioButtonGroup>

            <DropDownMenu
                value={layout}
                onChange={(value) => { handleLayoutChange(value) }} >
                <MenuItem value={1} primaryText="Grid A" />
                <MenuItem value={2} primaryText="Grid B" />
                <MenuItem value={3} primaryText="Grid C" />
            </DropDownMenu>
            <DropDownMenu
                value={runEffect}
                onChange={(value) => { handleRunEffectChange(value) }} >
                <MenuItem value={1} primaryText="Hapi" />
                <MenuItem value={2} primaryText="Amun" />
                <MenuItem value={3} primaryText="Kek" />
                <MenuItem value={4} primaryText="Isis" />
                <MenuItem value={5} primaryText="Montu" />
                <MenuItem value={6} primaryText="Osiris" />
            </DropDownMenu>
        </Toolbar>
    )
}

export default PostListOptions;




const filters = (
    this.state.posts.length < 30 ? null :
        <div>
            <Options
                drawer={this.drawer}
                isOptionsOpen={this.state.isOptionsOpen}
                handleFilterChange={this.handleFilterChange}
                filter={this.state.filter}
                layout={this.state.layout}
                runEffect={this.state.runEffect}
            />
            <div style={Object.assign({}, styles.optionsRightPanel,
                { right: drawer ? '6%' : '12%' })} >
                <IconButton onClick={this.handleOptionsOpenSwitch} >
                    <ImageTuneIcon color={this.state.isOptionsOpen
                        ? grey600 : null} />
                </IconButton>
                <ScrollToTop
                    showUnder={460}
                    style={styles.backToTop}>
                    <IconButton>
                        <NavidationArrowUpwardIcon />
                    </IconButton>
                </ScrollToTop>
            </div>
        </div>
)

const styles = {
    optionsRightPanel: {
        position: 'fixed', display: 'flex', flexDirection: 'column',
        transition: 'right 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    },
    backToTop: { position: 'static', },
    loader: { textAlign: 'center', display: 'block', width: '100%' },
    post: { padding: '8px 20px 8px 2px', fontSize: '14px' },
    postSecondary: { lineHeight: '22px', height: 'auto', paddingTop: '8px' },
    postIconButton: { padding: '5px 0', width: '18px', height: 'auto' }
}



// handleOptionsOpenSwitch = () => {
    //     this.setState({ isOptionsOpen: !this.state.isOptionsOpen });
    // }
    // handleFilterChange = (value) => {
    //     this.setState({ filter: value });
    //     //this.scroll.pageLoaded = 0
    //     this.setState({ reload: !this.state.reload })
    //     this.setState({ posts: [], postsCount: 1 })
    // }


    this.state = {
        empty: false,
        hasMore: true,
        posts: [],
        // reload: false,
        // isOptionsOpen: false,
        // filter: 'none',
        // temp
        // layout: 1,
        // runEffect: 1
    }